"use strict";
// src/aws/DynamoDBService.ts
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
class DynamoDBService {
    constructor(dynamoDBClient) {
        this.dynamoDB = dynamoDBClient || new aws_sdk_1.default.DynamoDB.DocumentClient();
    }
    createRecord(record) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dynamoDB.put({
                    TableName: 'YourTableName',
                    Item: record,
                }).promise();
            }
            catch (error) {
                console.error('Error creating record in DynamoDB:', error);
                throw new Error('Failed to create record');
            }
        });
    }
    deleteRecord(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.dynamoDB.delete({
                    TableName: 'YourTableName',
                    Key: { Id: id },
                }).promise();
            }
            catch (error) {
                console.error('Error deleting record in DynamoDB:', error);
                throw new Error('Failed to delete record');
            }
        });
    }
}
exports.default = DynamoDBService;
