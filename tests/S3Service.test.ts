import S3Service from '../src/aws/S3Service'
import AWS from 'aws-sdk'
import logger from '../src/utils/logger'

jest.mock('aws-sdk')
jest.mock('../src/utils/logger')

const mockedS3 = new AWS.S3() as jest.Mocked<AWS.S3>

describe('S3Service', () => {
    let s3Service: S3Service

    beforeEach(() => {
        s3Service = new S3Service()
    })

    it('should upload a file', async () => {
        mockedS3.upload.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        } as unknown as AWS.S3.ManagedUpload)

        const record = await s3Service.uploadFile('test.txt', Buffer.from('Test content'))
        expect(record).toHaveProperty('Id', 'test.txt')
        expect(logger.info).toHaveBeenCalled()
    })

    it('should get a file', async () => {
        mockedS3.getObject.mockReturnValue({
            promise: jest.fn().mockResolvedValue({ Body: Buffer.from('Test content') }),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        } as unknown as AWS.Request<AWS.S3.GetObjectOutput, AWS.AWSError>)

        const fileContent = await s3Service.getFile('test.txt')
        expect(fileContent.toString()).toBe('Test content')
        expect(logger.info).toHaveBeenCalled()
    })

    it('should delete a file', async () => {
        mockedS3.deleteObject.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        } as unknown as AWS.Request<AWS.S3.DeleteObjectOutput, AWS.AWSError>)

        await s3Service.deleteFile('test.txt')
        expect(logger.info).toHaveBeenCalled()
    })
})
