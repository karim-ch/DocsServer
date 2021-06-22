"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type User {
    id: ID
    email: String
    name: String
  }

  type LoginReturn {
    user: User
    token: String
    error: String
  }

  extend type Mutation {
    register(email: String!, password: String!, name: String!): LoginReturn
    login(email: String!, password: String!): LoginReturn
    logout: Boolean!
  }

  extend type Query {
    me: User
  }
`;
//# sourceMappingURL=user.schema.js.map