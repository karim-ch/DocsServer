// import { IResolvers } from 'graphql-tools';
// import * as bcrypt from 'bcryptjs';
// import { omit } from 'lodash';
// import pubsub from './pubsub';
// import { createUser, getUserByMail, getUserById } from './client';
//
// // const NEW_BOOK = 'NEW_BOOK';
//
// export const resolvers: IResolvers = {
//   // Subscription: {
//   //   newBook: {
//   //     subscribe: (_, __, { connection }) => {
//   //       if (!connection.context.req.session.userId) {
//   //         throw new Error('not authed');
//   //       }
//   //
//   //       return pubsub.asyncIterator([NEW_BOOK]);
//   //     },
//   //   },
//   // },
//   Query: {
//     me: (_, __, ...rest) => {
//       // console.log('here');
//       // console.log(req.session);
//       // if (!req.session.userId) {
//       //   return null;
//       // }
//
//       return 1;
//       // return getUserById(req.session.userId);
//     },
//   },
//   Mutation: {
//     logout: async (_, __, { req, res }) => {
//       return req.session.destroy(() => {
//         res.clearCookie('connect.sid');
//         return true;
//       });
//     },
//     register: async (_, { email, name, password }, { res }) => {
//       try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await createUser({ email, password: hashedPassword, name });
//         const { rows = [] } = await getUserByMail(email);
//         if (!rows.length) return null;
//         const [user] = rows;
//
//         const token = JSON.stringify(omit(user, 'password'));
//
//         res.cookie('token', token, {
//           httpOnly: true,
//           maxAge: 1000 * 60 * 60 * 24 * 365,
//           sameSite: 'none',
//           secure: false,
//         });
//         return { user, token };
//       } catch (err) {
//         return err.message;
//       }
//     },
//     login: async (_, { email, password }, { res }) => {
//       const { rows = [] } = await getUserByMail(email);
//       if (!rows.length) return null;
//       const [user] = rows;
//
//       const valid = await bcrypt.compare(password, user.password);
//       if (!valid) return null;
//
//       const token = JSON.stringify(omit(user, 'password'));
//
//       res.cookie('token', token, {
//         httpOnly: true,
//         maxAge: 1000 * 60 * 60 * 24 * 365,
//         sameSite: 'none',
//         secure: false,
//       });
//
//       return { user, token };
//     },
//     // createBook: async (_, { name }, { req }) => {
//     //   if (!req.session.userId) {
//     //     throw new Error("not authenticated");
//     //   }
//     //   const book = await Book.create({ name }).save();
//     //   pubsub.publish(NEW_BOOK, { newBook: book });
//     //   return book;
//     // }
//   },
// };
//# sourceMappingURL=resolvers.js.map