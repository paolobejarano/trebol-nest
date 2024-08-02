import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
    region: 'east-1', // Replace with your AWS region
    credentials: {
        accessKeyId: "AKIA5CUEVK6WJJYN575Z",
        secretAccessKey: "UJOLM1iQ2mUGJmmzEr6sDJ9J0kvCAzSDPLHoTF7X"
        // accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Make sure to set these environment variables
        // secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Make sure to set these environment variables
    },
});