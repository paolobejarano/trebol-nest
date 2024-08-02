import { Injectable } from '@nestjs/common';
import { s3Client } from '../aws-s3.config';
import { createPresignedPost, PresignedPostOptions } from '@aws-sdk/s3-presigned-post';

@Injectable()
export class S3UploadService {
    async generatePresignedPost(fileName: string, fileType: string) {
        const bucketName = 'static.kurios.la'; // Replace with your S3 bucket name

        const params: PresignedPostOptions = {
            Bucket: bucketName,
            Key: fileName,
            Conditions: [
                ['content-length-range', 0, 10485760], // 10 MB size limit
                ['starts-with', '$Content-Type', fileType],
            ],
            Fields: {
                'Content-Type': fileType,
            },
            Expires: 60, // URL expiration time in seconds
        };

        const presignedPost = await createPresignedPost(s3Client, params);

        const fileUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

        return {
            presignedPost,
            fileUrl,
            fileName,
        };
    }
}