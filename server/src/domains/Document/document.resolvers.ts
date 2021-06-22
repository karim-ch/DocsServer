import { IResolvers } from 'graphql-tools';
import { saveDocument, createDocument, getDocumentById } from '../../client';
import pubsub from '../../pubsub';
import { withFilter } from 'graphql-subscriptions';

const CHANGES = 'CHANGES';

export const resolvers: IResolvers = {
  Query: {
    async getDocument(_, { id }) {
      try {
        const { rows = [] } = await getDocumentById(id);
        return rows[0];
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },
  Mutation: {
    async createDocument(_, { name }) {
      try {
        const { rows = [] } = await createDocument(name);
        return rows[0];
      } catch (err) {
        throw new Error(err.message);
      }
    },

    async updateDocument(_, { id, data, uid }) {
      try {
        await pubsub.publish(CHANGES, { data, id, uid });
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    },

    async saveDocument(_, { id, data }) {
      try {
        await saveDocument(data, id);
        return true;
      } catch (err) {
        throw new Error(err.message);
      }
    },
  },

  Subscription: {
    changes: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('CHANGES'),
        (payload, variables) => {
          return payload.id === variables.id && payload.uid !== variables.uid;
        },
      ),
      resolve: ({ data }) => data,
    },
  },
};
