import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../../shared/service/awsConfig';
import { sqsConfig } from '../../../config/sqsConfig';
import { QueueMessage } from '../../shared/types/notification';
import { logger } from '../../shared/utils/logger';

export async function sendToMainQueue(message: QueueMessage): Promise<string> {
  try {
    const command = new SendMessageCommand({
      QueueUrl: sqsConfig.queues.main.url,
      MessageBody: JSON.stringify(message),
      MessageGroupId: 'notification-group',
      MessageDeduplicationId: `${message.templateId}-${Date.now()}-${Math.random()}`
    });

    const result = await sqsClient.send(command);
    logger.info('Message sent to main queue:', { messageId: result.MessageId });
    return result.MessageId!;
  } catch (error) {
    logger.error('Failed to send message to main queue:', error);
    throw error;
  }
}