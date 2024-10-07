import dotenv from 'dotenv'
import S3Service from './aws/S3Service'
import DynamoDBService from './aws/DynamoDBService'

dotenv.config()

const s3Service = new S3Service()
const dynamoDBService = new DynamoDBService()

async function run() {
    try {
        // Upload a file
        await s3Service.uploadFile('test.txt', Buffer.from('Hello, World!'))
        console.log('File uploaded successfully.')

        // Create a record
        const record = { Id: '1', createdAt: Date.now(), name: 'test.txt', size: 123 }
        await dynamoDBService.createRecord(record)
        console.log('Record created successfully.')

        // Fetch a file
        const fileContent = await s3Service.getFile('test.txt')
        console.log('File content:', fileContent.toString())

        // Delete a file
        await s3Service.deleteFile('test.txt')
        console.log('File deleted successfully.')

        // Delete a record
        await dynamoDBService.deleteRecord('1')
        console.log('Record deleted successfully.')

    } catch (error) {
        console.error('Error:', error)
    }
}

run()
