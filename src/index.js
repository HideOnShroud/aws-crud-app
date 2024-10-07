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
const S3Service_1 = __importDefault(require("./aws/S3Service"));
const s3Service = new S3Service_1.default();
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    // Example usage
    try {
        // Upload a file
        const fileContent = Buffer.from('Hello, world!');
        const record = yield s3Service.uploadFile('hello.txt', fileContent);
        console.log('Uploaded File Record:', record);
        // Retrieve a file
        const retrievedFile = yield s3Service.getFile('hello.txt');
        console.log('Retrieved File Content:', retrievedFile.toString());
        // Delete a file
        yield s3Service.deleteFile('hello.txt');
        console.log('File deleted successfully');
    }
    catch (error) {
        console.error('Error:', error);
    }
});
run();
