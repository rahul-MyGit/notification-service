import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { sqsClient } from '../../shared/service/awsConfig';
import { sqsConfig } from '../../../config/sqsConfig';
import { PriorityQueueMessage } from '../../shared/types/notification';
import { logger } from '../../shared/utils/logger';

export async function sendToPriorityQueue(message: PriorityQueueMessage): Promise<string> {
    try {
        const queueUrl = getQueueUrlByPriority(message.priority);

        const command = new SendMessageCommand({
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify(message),
            MessageGroupId: `${message.priority}-group`,
            MessageDeduplicationId: `${message.notificationId}-${Date.now()}`
        });

        const result = await sqsClient.send(command);
        logger.info('Message sent to priority queue:', {
            messageId: result.MessageId,
            priority: message.priority
        });
        return result.MessageId!;
    } catch (error) {
        logger.error('Failed to send message to priority queue:', error);
        throw error;
    }
}

function getQueueUrlByPriority(priority: 'P1' | 'P2' | 'P3'): string {
    switch (priority) {
        case 'P1':
            return sqsConfig.queues.p1.url;
        case 'P2':
            return sqsConfig.queues.p2.url;
        case 'P3':
            return sqsConfig.queues.p3.url;
        default:
            throw new Error(`Invalid priority: ${priority}`);
    }
}

export async function sendToDLQ(message: any, error: string): Promise<void> {
    try {
        const dlqMessage = {
            originalMessage: message,
            error,
            timestamp: new Date().toISOString(),
            service: 'notification-service'
        };

        const command = new SendMessageCommand({
            QueueUrl: sqsConfig.queues.dlq.url,
            MessageBody: JSON.stringify(dlqMessage),
            MessageGroupId: 'dlq-group',
            MessageDeduplicationId: `dlq-${Date.now()}-${Math.random()}`
        });

        await sqsClient.send(command);
        logger.info('Message sent to DLQ');
    } catch (dlqError) {
        logger.error('Failed to send message to DLQ:', dlqError);
    }
}