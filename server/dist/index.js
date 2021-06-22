"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const http = __importStar(require("http"));
const lodash_1 = require("lodash");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const domains_1 = __importDefault(require("./domains"));
const jwt_1 = require("./utils/jwt");
const getWhiteList_1 = __importDefault(require("./utils/getWhiteList"));
const getEnv_1 = __importDefault(require("./utils/getEnv"));
const port = getEnv_1.default('PORT', 4000);
const app = express_1.default();
app.use(cookie_parser_1.default());
const apolloServer = new apollo_server_express_1.ApolloServer(domains_1.default);
const whitelist = getWhiteList_1.default();
const corsOptions = {
    origin(origin, callback) {
        const originIsWhitelisted = !lodash_1.isEmpty(whitelist.filter(white => lodash_1.includes(origin, white)));
        callback(null, originIsWhitelisted);
    },
    credentials: true,
};
app.use((req, res, next) => {
    const { token } = req.cookies;
    if (token)
        req.userInfo = jwt_1.decodeToken(token);
    next();
});
apolloServer.applyMiddleware({ cors: corsOptions, app });
const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);
httpServer.listen(port, () => {
    console.log(`Server ready at ${port}`);
    console.log(`🚀Subscriptions ready at ${port}${apolloServer.subscriptionsPath}`);
});
//# sourceMappingURL=index.js.map