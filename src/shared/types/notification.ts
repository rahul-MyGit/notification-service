export interface NotificationRequest {
    templateId: string;
    userIds: string[];
    priority: 'P1' | 'P2' | 'P3';
    metadata?: Record<string, any>;
}

export interface ProcessedNotification {
    id: string;
    templateId: string;
    userId: string;
    priority: 'P1' | 'P2' | 'P3';
    subject: string;
    body: string;
    userEmail: string;
    retryCount: number;
}

export interface QueueMessage {
    templateId: string;
    userIds: string[];
    priority: 'P1' | 'P2' | 'P3';
    metadata?: Record<string, any>;
}

export interface PriorityQueueMessage {
    notificationId: string;
    templateId: string;
    userId: string;
    subject: string;
    body: string;
    userEmail: string;
    priority: 'P1' | 'P2' | 'P3';
    retryCount: number;
}