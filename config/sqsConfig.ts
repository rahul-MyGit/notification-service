import { QUEUE_NAMES } from '../src/shared/utils/constant';

export const sqsConfig = {
  region: process.env.AWS_REGION || 'us-east-1',
  queues: {
    main: {
      url: process.env.SQS_MAIN_QUEUE_URL || `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${QUEUE_NAMES.MAIN}`,
      visibilityTimeout: 300, // 5 minutes
      messageRetentionPeriod: 1209600, // 14 days
      maxReceiveCount: 3
    },
    p1: {
      url: process.env.SQS_P1_QUEUE_URL || `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${QUEUE_NAMES.P1}`,
      visibilityTimeout: 60,
      messageRetentionPeriod: 1209600,
      maxReceiveCount: 2
    },
    p2: {
      url: process.env.SQS_P2_QUEUE_URL || `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${QUEUE_NAMES.P2}`,
      visibilityTimeout: 120,
      messageRetentionPeriod: 1209600,
      maxReceiveCount: 2
    },
    p3: {
      url: process.env.SQS_P3_QUEUE_URL || `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${QUEUE_NAMES.P3}`,
      visibilityTimeout: 180,
      messageRetentionPeriod: 1209600,
      maxReceiveCount: 2
    },
    dlq: {
      url: process.env.SQS_DLQ_URL || `https://sqs.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_ACCOUNT_ID}/${QUEUE_NAMES.DLQ}`,
      visibilityTimeout: 300,
      messageRetentionPeriod: 1209600
    }
  }
};