import { prisma } from '../connection';
import { Notification, NotificationStatus, NotificationPriority } from '../../../../generated/prisma';

export async function createNotification(data: {
    templateId: string;
    userId: string;
    priority: NotificationPriority;
}): Promise<Notification> {
    return await prisma.notification.create({
        data
    });
}

export async function updateNotificationStatus(
    id: string,
    status: NotificationStatus,
    updates?: {
        sentAt?: Date;
        failedAt?: Date;
        retryCount?: number;
        errorMessage?: string;
        sesMessageId?: string;
        s3SnapshotUrl?: string;
    }
): Promise<Notification> {
    return await prisma.notification.update({
        where: { id },
        data: {
            status,
            updatedAt: new Date(),
            ...updates
        }
    });
}

export async function getNotificationById(id: string): Promise<Notification | null> {
    return await prisma.notification.findUnique({
        where: { id },
        include: {
            template: true,
            user: true
        }
    });
}

export async function getUserById(id: string) {
    return await prisma.user.findUnique({
        where: { id }
    });
}