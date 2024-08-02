import { Controller, Post, Body } from '@nestjs/common';
import { S3UploadService } from './s3-upload.service';

@Controller('s3-upload-info')
export class S3UploadController {
    constructor(private readonly s3UploadService: S3UploadService) {}

    @Post()
    async getS3UploadInfo(
        @Body('filename') fileName: string,
        @Body('filetype') fileType: string,
    ) {
        return this.s3UploadService.generatePresignedPost(fileName, fileType);
    }
}