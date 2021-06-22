"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type Book {
    id: ID!
    name: String!
  }
  extend type Mutation {
    createBook(name: String!): Book
  }

  extend type Subscription {
    newBook: Book!
  }
`;
//# sourceMappingURL=book.schema.js.map