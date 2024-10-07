"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = {
    info: (message) => {
        console.log(`INFO: ${message}`);
    },
    error: (message, error) => {
        console.error(`ERROR: ${message}`, error);
    },
};
exports.default = logger;
