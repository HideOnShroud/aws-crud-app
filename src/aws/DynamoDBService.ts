import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

interface Record {
    Id: string;
    createdAt: number;
    name: string;
    size: number;
}

class DynamoDBService {
    private dynamoDB: DynamoDBDocumentClient;
    private tableName: string;

    constructor(dynamoDBClient?: DynamoDBDocumentClient) {
        this.dynamoDB = dynamoDBClient || DynamoDBDocumentClient.from(new DynamoDB({ region: process.env.AWS_REGION }));
        this.tableName = process.env.YOUR_TABLE_NAME || '';
    }

    async createRecord(record: Record): Promise<void> {
        try {
            await this.dynamoDB.put({
                TableName: this.tableName,
                Item: record,
            });
        } catch (error) {
            console.error('Error creating record in DynamoDB:', error);
            throw new Error('Failed to create record');
        }
    }

    async deleteRecord(id: string): Promise<void> {
        try {
            await this.dynamoDB.delete({
                TableName: this.tableName,
                Key: { Id: id },
            });
        } catch (error) {
            console.error('Error deleting record in DynamoDB:', error);
            throw new Error('Failed to delete record');
        }
    }
}

export default DynamoDBService;
