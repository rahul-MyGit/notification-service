export const QUEUE_NAMES = {
    MAIN: 'notification-main-queue.fifo',
    P1: 'notification-p1-queue.fifo',
    P2: 'notification-p2-queue.fifo',
    P3: 'notification-p3-queue.fifo',
    DLQ: 'notification-dlq.fifo'
} as const;

export const REDIS_KEYS = {
    BLOOM_FILTER: 'notification:bloom',
    TEMPLATE_CACHE: 'template:cache',
    USER_CACHE: 'user:cache'
} as const;

export const RETRY_CONFIG = {
    MAX_RETRIES: 2,
    RETRY_DELAY: 5000, // 5 seconds
    BACKOFF_MULTIPLIER: 2
} as const;

export const SES_CONFIG = {
    MAX_SEND_RATE: 14, // emails per second
    MAX_SEND_QUOTA: 2000000
} as const;