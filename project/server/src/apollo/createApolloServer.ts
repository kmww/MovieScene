import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { Request, Response } from 'express';
import {
  JwtVerifiedUser,
  verifyAccessTokenFromReqHeaders,
} from '../utils/jwt-auth';
import { CutResolver } from '../resolvers/Cut';
import { FilmResolver } from '../resolvers/Film';
import { UserResolver } from '../resolvers/User';

export interface MyContext {
  req: Request;
  res: Response;
  verifiedUser: JwtVerifiedUser;
}

const createApolloServer = async (): Promise<ApolloServer> => {
  return new ApolloServer<MyContext>({
    schema: await buildSchema({
      resolvers: [FilmResolver, CutResolver, UserResolver],
    }),
    plugins: [ApolloServerPluginLandingPageLocalDefault()],
    context: ({ req, res }) => {
      const verified = verifyAccessTokenFromReqHeaders(req.headers);
      return { req, res, verifiedUser: verified };
    },
  });
};

export default createApolloServer;
