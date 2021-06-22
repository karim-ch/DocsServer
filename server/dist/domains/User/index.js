"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = __importDefault(require("./user.schema"));
const user_resolvers_1 = require("./user.resolvers");
exports.default = {
    schema: user_schema_1.default,
    resolvers: user_resolvers_1.resolvers,
};
//# sourceMappingURL=index.js.map