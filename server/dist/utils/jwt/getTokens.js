"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const generateToken_1 = __importDefault(require("./generateToken"));
const secret = '123456789';
function geTokens(payload) {
    return generateToken_1.default([
        {
            name: 'token',
            options: {
                payload,
                secret,
                options: { expiresIn: 1 },
            },
        },
    ]);
}
exports.default = geTokens;
//# sourceMappingURL=getTokens.js.map