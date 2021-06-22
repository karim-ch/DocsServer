import { gql } from 'apollo-server-express';

export default gql`
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
