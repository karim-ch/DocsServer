"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_schema_1 = __importDefault(require("./book.schema"));
const book_resolvers_1 = require("./book.resolvers");
exports.default = {
    schema: book_schema_1.default,
    resolvers: book_resolvers_1.resolvers,
};
//# sourceMappingURL=index.js.map