import DynamoDBService from '../src/aws/DynamoDBService'
import AWS from 'aws-sdk'
import logger from '../src/utils/logger'

jest.mock('aws-sdk')
jest.mock('../src/utils/logger')

const mockedDynamoDB = new AWS.DynamoDB.DocumentClient() as jest.Mocked<AWS.DynamoDB.DocumentClient>

describe('DynamoDBService', () => {
    let dynamoDBService: DynamoDBService

    beforeEach(() => {
        dynamoDBService = new DynamoDBService()
    })

    it('should create a record', async () => {
        const record = { Id: '1', createdAt: Date.now(), name: 'test.txt', size: 123 }

        mockedDynamoDB.put.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        } as unknown as AWS.Request<AWS.DynamoDB.PutItemOutput, AWS.AWSError>)

        await dynamoDBService.createRecord(record)
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining(`DynamoDB record created for file: ${record.name}`))
    })

    it('should delete a record', async () => {
        mockedDynamoDB.delete.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        } as unknown as AWS.Request<AWS.DynamoDB.DeleteItemOutput, AWS.AWSError>)

        await dynamoDBService.deleteRecord('test.txt')
        expect(logger.info).toHaveBeenCalledWith(expect.stringContaining(`DynamoDB record deleted for file: test.txt`))
    })
})
