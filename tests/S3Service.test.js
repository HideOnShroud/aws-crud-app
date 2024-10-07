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
const S3Service_1 = __importDefault(require("../src/aws/S3Service"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const logger_1 = __importDefault(require("../src/utils/logger"));
jest.mock('aws-sdk');
jest.mock('../src/utils/logger');
const mockedS3 = new aws_sdk_1.default.S3();
describe('S3Service', () => {
    let s3Service;
    beforeEach(() => {
        s3Service = new S3Service_1.default();
    });
    it('should upload a file', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedS3.upload.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        });
        const record = yield s3Service.uploadFile('test.txt', Buffer.from('Test content'));
        expect(record).toHaveProperty('Id', 'test.txt');
        expect(logger_1.default.info).toHaveBeenCalled();
    }));
    it('should get a file', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedS3.getObject.mockReturnValue({
            promise: jest.fn().mockResolvedValue({ Body: Buffer.from('Test content') }),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        });
        const fileContent = yield s3Service.getFile('test.txt');
        expect(fileContent.toString()).toBe('Test content');
        expect(logger_1.default.info).toHaveBeenCalled();
    }));
    it('should delete a file', () => __awaiter(void 0, void 0, void 0, function* () {
        mockedS3.deleteObject.mockReturnValue({
            promise: jest.fn().mockResolvedValue({}),
            abort: jest.fn(),
            createReadStream: jest.fn(),
            eachPage: jest.fn(),
            isPageable: jest.fn(),
            send: jest.fn(),
            on: jest.fn(),
        });
        yield s3Service.deleteFile('test.txt');
        expect(logger_1.default.info).toHaveBeenCalled();
    }));
});
