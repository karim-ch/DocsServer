"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
function getEnv(varName, defaultValue) {
    return process.env[varName] || defaultValue;
}
exports.default = getEnv;
//# sourceMappingURL=getEnv.js.map