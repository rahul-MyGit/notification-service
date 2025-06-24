import { ReceiveMessageCommand, DeleteMessageCommand, Message } from '@aws-sdk/client-sqs';
import { sqsClient } from '../shared/service/awsConfig';
// import { sqsConfig } from './sqsConfig';
import { logger } from '../shared/utils/logger';

export interface QueueManagerConfig {
  queueUrl: string;
  maxMessages: number;
  waitTimeSeconds: number;
  visibilityTimeout: number;
}

export class QueueManager {
  private config: QueueManagerConfig;
  private isPolling: boolean = false;

  constructor(config: QueueManagerConfig) {
    this.config = config;
  }

  async startPolling(messageHandler: (message: Message) => Promise<void>): Promise<void> {
    this.isPolling = true;
    logger.info('Started polling queue:', { queueUrl: this.config.queueUrl });

    while (this.isPolling) {
      try {
        const messages = await this.receiveMessages();
        
        if (messages.length > 0) {
          await Promise.all(
            messages.map(async (message) => {
              try {
                await messageHandler(message);
                await this.deleteMessage(message);
              } catch (error) {
                logger.error('Failed to process message:', error);
                // Message will become visible again after visibility timeout
              }
            })
          );
        }
      } catch (error) {
        logger.error('Error in queue polling:', error);
        await this.sleep(5000); // Wait 5 seconds before retrying
      }
    }
  }

  async receiveMessages(): Promise<Message[]> {
    const command = new ReceiveMessageCommand({
      QueueUrl: this.config.queueUrl,
      MaxNumberOfMessages: this.config.maxMessages,
      WaitTimeSeconds: this.config.waitTimeSeconds,
      VisibilityTimeout: this.config.visibilityTimeout
    });

    const result = await sqsClient.send(command);
    return result.Messages || [];
  }

  async deleteMessage(message: Message): Promise<void> {
    if (!message.ReceiptHandle) {
      throw new Error('Message receipt handle is required for deletion');
    }

    const command = new DeleteMessageCommand({
      QueueUrl: this.config.queueUrl,
      ReceiptHandle: message.ReceiptHandle
    });

    await sqsClient.send(command);
  }

  stopPolling(): void {
    this.isPolling = false;
    logger.info('Stopped polling queue:', { queueUrl: this.config.queueUrl });
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}