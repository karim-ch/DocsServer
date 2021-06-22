"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const lodash_1 = require("lodash");
const User_1 = __importDefault(require("./User"));
const Document_1 = __importDefault(require("./Document"));
const cookie_1 = __importDefault(require("cookie"));
const jwt_1 = require("../utils/jwt");
const domains = [User_1.default, Document_1.default];
const root = apollo_server_express_1.gql `
  scalar DateTime
  scalar JSON
  scalar JSONObject

  type Query {
    test: [String]
  }

  type Mutation {
    test: [String]
  }

  type Subscription {
    test: [JSON]
  }
`;
const rootResolvers = {};
exports.default = {
    typeDefs: [root, ...domains.map(({ schema }) => schema)],
    resolvers: domains.reduce((acc, { resolvers }) => lodash_1.merge({}, acc, resolvers), rootResolvers),
    context: (ctx) => {
        if (ctx.connection)
            return ctx.connection.context;
        const userInfo = lodash_1.get(ctx, 'req.userInfo', {});
        return Object.assign(Object.assign({}, ctx), { userInfo });
    },
    subscriptions: {
        onConnect: (connectionParams, webSocket) => {
            const cookiesString = lodash_1.get(webSocket, 'upgradeReq.headers.cookie', '');
            const { token } = cookie_1.default.parse(cookiesString);
            if (!token)
                throw new Error('Not authorized');
            return jwt_1.decodeToken(token);
        },
    },
    playground: {
        settings: {
            'request.credentials': 'include',
        },
    },
};
//# sourceMappingURL=index.js.map