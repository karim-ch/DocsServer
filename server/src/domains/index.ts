import { gql } from 'apollo-server-express';
import { merge, get } from 'lodash';
import User from './User';
import Document from './Document';
import cookie from 'cookie';
import { decodeToken } from '../utils/jwt';

const domains = [User, Document];

const root = gql`
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

export default {
  typeDefs: [root, ...domains.map(({ schema }) => schema)],
  resolvers: domains.reduce((acc, { resolvers }) => merge({}, acc, resolvers), rootResolvers),
  context: (ctx: any) => {
    if (ctx.connection) return ctx.connection.context;
    const userInfo = get(ctx, 'req.userInfo', {});

    return {
      ...ctx,
      userInfo,
    };
  },

  subscriptions: {
    onConnect: (connectionParams, webSocket) => {
      const cookiesString = get(webSocket, 'upgradeReq.headers.cookie', '');
      const { token } = cookie.parse(cookiesString);
      if (!token) throw new Error('Not authorized');
      return decodeToken(token);
    },
  },
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
};
