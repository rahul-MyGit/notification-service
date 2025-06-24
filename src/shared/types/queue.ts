export interface SQSConfig {
    region: string;
    mainQueueUrl: string;
    p1QueueUrl: string;
    p2QueueUrl: string;
    p3QueueUrl: string;
    dlqUrl: string;
    visibilityTimeout: number;
    messageRetentionPeriod: number;
}