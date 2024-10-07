import { S3 } from '@aws-sdk/client-s3';

class S3Service {
    private s3: S3;
    private bucketName: string;

    constructor(s3Client?: S3) {
        this.s3 = s3Client || new S3({ region: process.env.AWS_REGION });
        this.bucketName = process.env.YOUR_BUCKET_NAME || '';
    }

    async uploadFile(fileName: string, fileContent: Buffer): Promise<void> {
        try {
            await this.s3.putObject({
                Bucket: this.bucketName,
                Key: fileName,
                Body: fileContent,
            });
        } catch (error) {
            console.error('Error uploading file to S3:', error);
            throw new Error('Failed to upload file');
        }
    }

    async getFile(fileName: string): Promise<Buffer> {
        try {
            const data = await this.s3.getObject({
                Bucket: this.bucketName,
                Key: fileName,
            });
            return data.Body as Buffer;
        } catch (error) {
            console.error('Error getting file from S3:', error);
            throw new Error('Failed to get file');
        }
    }

    async deleteFile(fileName: string): Promise<void> {
        try {
            await this.s3.deleteObject({
                Bucket: this.bucketName,
                Key: fileName,
            });
        } catch (error) {
            console.error('Error deleting file from S3:', error);
            throw new Error('Failed to delete file');
        }
    }
}

export default S3Service;
