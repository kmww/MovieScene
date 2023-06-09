import express from 'express';
import http from 'http';
import 'reflect-metadata';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import createApolloServer from './apollo/createApolloServer';
import { createDB } from './db/db-client';
import { createSchema } from './apollo/createSchema';
import { createSubScriptionServer } from './apollo/createSubscriptionSever';

async function main() {
  await createDB();
  const app = express();
  app.use(express.static('public'));
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 1024 * 1000 * 5, maxFiles: 1 }));
  const httpServer = http.createServer(app);

  const schema = await createSchema();
  await createSubScriptionServer(schema, httpServer);
  const apolloServer = await createApolloServer(schema);
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: ['http://localhost:3000', 'https://studio.apollographql.com'],
      credentials: true,
    },
  });

  httpServer.listen(process.env.PORT || 4000, () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`
      server started on => http://localhost:4000
      graphql playground => http://localhost:4000/graphql
      `);
    } else {
      console.log(`
      Production server Started...
      `);
    }
  });
}

main().catch((err) => console.error(err));
