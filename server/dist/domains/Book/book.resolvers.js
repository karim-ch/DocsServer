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
const NEW_BOOK = 'NEW_BOOK';
exports.resolvers = {
    Mutation: {
        createBook(_, { name }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield client_1.createBook(name);
                    const { rows = [] } = yield client_1.getBookByName(name);
                    if (!rows.length)
                        return null;
                    const [book] = rows;
                    yield pubsub_1.default.publish(NEW_BOOK, { newBook: book });
                    return book;
                }
                catch (err) {
                    throw new Error(err.message);
                }
            });
        },
    },
    Subscription: {
        newBook: {
            subscribe: (_, __, { id }) => {
                if (!id) {
                    throw new Error('Not authenticated');
                }
                return pubsub_1.default.asyncIterator([NEW_BOOK]);
            },
        },
    },
};
//# sourceMappingURL=book.resolvers.js.map