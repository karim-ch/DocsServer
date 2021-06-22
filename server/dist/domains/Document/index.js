"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const document_schema_1 = __importDefault(require("./document.schema"));
const document_resolvers_1 = require("./document.resolvers");
exports.default = {
    schema: document_schema_1.default,
    resolvers: document_resolvers_1.resolvers,
};
//# sourceMappingURL=index.js.map