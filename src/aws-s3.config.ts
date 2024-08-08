import { S3Client } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export const s3Client = new S3Client({
    region: process.env.AWS_REGION, // AWS region from environment variable
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID, // AWS access key ID from environment variable
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // AWS secret access key from environment variable
    },
});