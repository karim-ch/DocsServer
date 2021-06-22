import { omit } from 'lodash';
import { IResolvers } from 'graphql-tools';
import * as bcrypt from 'bcryptjs';
import { createUser, getUserByMail } from '../../client';
import { getTokens } from '../../utils/jwt';
import { isEmpty } from 'lodash';
import getEnv from '../../utils/getEnv';

const cookieEnv = getEnv('cookieEnv', 'local');

export const resolvers: IResolvers = {
  Query: {
    async me(_, __, { userInfo }) {
      if (!isEmpty(userInfo)) return userInfo;
      return null;
    },
  },
  Mutation: {
    async logout(_, __, { res }) {
      console.log('logout');
      res.clearCookie('token');
      return true;
    },
    async login(_, { email, password }, { res }) {
      try {
        const { rows = [] } = await getUserByMail(email);
        if (!rows.length) return { error: 'User not found' };
        const [user] = rows;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return { error: 'User not found' };

        const { token } = getTokens(omit(user, 'password'));

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
          sameSite: 'none',
          secure: cookieEnv !== 'local',
        });

        return { user, token };
      } catch (err) {
        return { error: err.message };
      }
    },

    async register(_, { email, name, password }, { res }) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const { rows = [] } = await createUser({ email, password: hashedPassword, name });
        const [user] = rows;

        const { token } = getTokens(user);

        res.cookie('token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
          sameSite: 'none',
          secure: cookieEnv !== 'local',
        });

        return { user, token };
      } catch (err) {
        return { error: err.message };
      }
    },
  },
};
