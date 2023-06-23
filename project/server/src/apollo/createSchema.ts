import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { PubSub } from 'graphql-subscriptions';

import { CutResolver } from '../resolvers/Cut';
import { FilmResolver } from '../resolvers/Film';
import { UserResolver } from '../resolvers/User';
import { CutReviewResolver } from '../resolvers/CutReview';
import { NotificationResolver } from '../resolvers/Notification';

export const createSchema = async (): Promise<GraphQLSchema> => {
  return buildSchema({
    resolvers: [
      FilmResolver,
      CutResolver,
      UserResolver,
      CutReviewResolver,
      NotificationResolver,
    ],
    pubSub: new PubSub(),
  });
};
