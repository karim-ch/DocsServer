import { ApolloServer } from 'apollo-server-express';
import * as http from 'http';
import { isEmpty, includes } from 'lodash';
import Express from 'express';
import cookieParser from 'cookie-parser';
import schema from './domains';
import { decodeToken } from './utils/jwt';
import getWhiteList from './utils/getWhiteList';
import getEnv from './utils/getEnv';

declare module 'express-serve-static-core' {
  interface Request {
    userInfo: any;
  }
}

const port = getEnv('PORT', 4000);

const app = Express();
app.use(cookieParser());

const apolloServer = new ApolloServer(schema);
const whitelist = getWhiteList();

const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = !isEmpty(whitelist.filter(white => includes(origin, white)));
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

app.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) req.userInfo = decodeToken(token);
  next();
});

apolloServer.applyMiddleware({ cors: corsOptions, app });

const httpServer = http.createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen(port, () => {
  console.log(`Server ready at ${port}`);
  console.log(`🚀Subscriptions ready at ${port}${apolloServer.subscriptionsPath}`);
});
