import { GraphQLSchema, execute, subscribe } from 'graphql';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';

export const createSubScriptionServer = async (
  schema: GraphQLSchema,
  server: http.Server,
): Promise<SubscriptionServer> => {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      onConnect: (connectionParams: any) => {
        console.log('connected');
      },
      onDisconnect: () => {
        console.log('disconnected');
      },
    },
    { server, path: '/graphql' },
  );
};
