"use strict";
// src/aws/S3Service.ts
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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
class S3Service {
    constructor(s3Client) {
        this.s3 = s3Client || new aws_sdk_1.default.S3();
    }
    uploadFile(fileName, fileContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.s3.upload({
                    Bucket: 'YourBucketName',
                    Key: fileName,
                    Body: fileContent,
                }).promise();
            }
            catch (error) {
                console.error('Error uploading file to S3:', error);
                throw new Error('Failed to upload file');
            }
        });
    }
    getFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.s3.getObject({
                    Bucket: 'YourBucketName',
                    Key: fileName,
                }).promise();
                return data.Body;
            }
            catch (error) {
                console.error('Error getting file from S3:', error);
                throw new Error('Failed to get file');
            }
        });
    }
    deleteFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.s3.deleteObject({
                    Bucket: 'YourBucketName',
                    Key: fileName,
                }).promise();
            }
            catch (error) {
                console.error('Error deleting file from S3:', error);
                throw new Error('Failed to delete file');
            }
        });
    }
}
exports.default = S3Service;
