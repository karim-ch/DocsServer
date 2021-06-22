"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.default = apollo_server_express_1.gql `
  type Document {
    id: ID!
    name: String!
    data: JSON
  }
  extend type Mutation {
    createDocument(name: String!): Document
    saveDocument(id: ID!, data: JSON): Boolean
    updateDocument(id: ID!, uid: ID!, data: JSON): Boolean
  }

  extend type Query {
    getDocument(id: ID!): Document
  }

  extend type Subscription {
    changes(id: ID!, uid: ID!): JSON
  }
`;
//# sourceMappingURL=document.schema.js.map