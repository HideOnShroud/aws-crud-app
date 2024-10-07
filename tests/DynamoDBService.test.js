"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DynamoDBService_1 = __importDefault(require("../src/aws/DynamoDBService"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const logger_1 = __importDefault(require("../src/utils/logger"));
jest.mock('aws-sdk');
jest.mock('../src/utils/logger');
const mockedDynamoDB = new aws_sdk_1.default.DynamoDB.DocumentClient();
describe('DynamoDBService', () => {
    let dynamoDBService;
    beforeEach(() => {
        dynamoDBService = new DynamoDBService_1.default();
    });
    it('should create a record', () => __awaiter(void 0, void 0, void 0, function* () {
        const record = { Id: '1', createdAt: Date.now(), name: 'test.txt', size: 123 };
        mockedDynamoDB.put.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(), // Mock additional methods as needed
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        }); // Cast to the appropriate type
        yield dynamoDBService.createRecord(record);
        expect(logger_1.default.info).toHaveBeenCalledWith(expect.stringContaining(`DynamoDB record created for file: ${record.name}`));
    }));
    it('should delete a record', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedDynamoDB.delete.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(), // Mock additional methods as needed
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        }); // Cast to the appropriate type
        yield dynamoDBService.deleteRecord('test.txt');
        expect(logger_1.default.info).toHaveBeenCalledWith(expect.stringContaining(`DynamoDB record deleted for file: test.txt`));
    }));
});
