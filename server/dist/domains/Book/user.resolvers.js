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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const lodash_1 = require("lodash");
const bcrypt = __importStar(require("bcryptjs"));
const client_1 = require("../../client");
exports.resolvers = {
    Query: {
        me(_, __, { req: { userInfo } }) {
            return __awaiter(this, void 0, void 0, function* () {
                return userInfo;
            });
        },
    },
    Mutation: {
        login(_, { email, password }, { res }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const { rows = [] } = yield client_1.getUserByMail(email);
                    if (!rows.length)
                        return null;
                    const [user] = rows;
                    const valid = yield bcrypt.compare(password, user.password);
                    if (!valid)
                        return null;
                    const token = JSON.stringify(lodash_1.omit(user, 'password'));
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24 * 365,
                        sameSite: 'none',
                        secure: false,
                    });
                    return { user, token };
                }
                catch (err) {
                    return err.message;
                }
            });
        },
        register(_, { email, name, password }, { res }) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    const hashedPassword = yield bcrypt.hash(password, 10);
                    yield client_1.createUser({ email, password: hashedPassword, name });
                    const { rows = [] } = yield client_1.getUserByMail(email);
                    if (!rows.length)
                        return null;
                    const [user] = rows;
                    const token = JSON.stringify(lodash_1.omit(user, 'password'));
                    res.cookie('token', token, {
                        httpOnly: true,
                        maxAge: 1000 * 60 * 60 * 24 * 365,
                        sameSite: 'none',
                        secure: false,
                    });
                    return { user, token };
                }
                catch (err) {
                    return err.message;
                }
            });
        },
    },
};
//# sourceMappingURL=user.resolvers.js.map