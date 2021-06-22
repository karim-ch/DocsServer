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
exports.resolvers = void 0;
const client_1 = require("../../client");
const pubsub_1 = __importDefault(require("../../pubsub"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const CHANGES = 'CHANGES';
exports.resolvers = {
    Query: {
        getDocument(_, { id }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { rows = [] } = yield client_1.getDocumentById(id);
                    return rows[0];
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
    },
    Mutation: {
        createDocument(_, { name }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { rows = [] } = yield client_1.createDocument(name);
                    return rows[0];
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
        updateDocument(_, { id, data, uid }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield pubsub_1.default.publish(CHANGES, { data, id, uid });
                    return true;
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
        saveDocument(_, { id, data }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield client_1.saveDocument(data, id);
                    return true;
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
    },
    Subscription: {
        changes: {
            subscribe: graphql_subscriptions_1.withFilter(() => pubsub_1.default.asyncIterator('CHANGES'), (payload, variables) => {
                return payload.id === variables.id && payload.uid !== variables.uid;
            }),
            resolve: ({ data }) => data,
        },
    },
};
//# sourceMappingURL=document.resolvers.js.map