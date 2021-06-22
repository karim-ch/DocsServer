"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getEnv_1 = __importDefault(require("./getEnv"));
const frontEndpoints = getEnv_1.default('FRONT_ENDPOINTS', '');
const defaultWhitelist = [...frontEndpoints.split(','), 'http://localhost:3001'];
const defaultMode = getEnv_1.default('NODE_ENV', 'production');
function getWhiteList(mode = defaultMode, whiteList = defaultWhitelist) {
    if (mode !== 'production')
        return whiteList;
    return whiteList.filter(ip => !ip.includes('localhost'));
}
exports.default = getWhiteList;
//# sourceMappingURL=getWhiteList.js.map