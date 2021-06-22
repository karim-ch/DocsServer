import { gql } from 'apollo-server-express';

export default gql`
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
