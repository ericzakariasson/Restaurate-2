import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { useContainer } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { generateSchema } from './schema';
import { SessionRequest } from './graphql/types';
import { Container } from 'typedi';
import { createConnection } from './utils/createConnection';
import * as morgan from 'morgan';
import { logger, LogStream } from './utils/logger';
import { isProduction } from './utils/env.helper';

dotenv.config();

const startServer = async (): Promise<void> => {
  useContainer(Container);
  const connection = await createConnection();

  if (!connection) {
    logger.error('Could not established connection to database');
  }

  const app = express();

  logger.info('Allowed origins', process.env.ALLOWED_ORIGINS);

  const corsOptions = {
    credentials: true,
    origin: process.env.ALLOWED_ORIGINS
  };

  app.use(cors(corsOptions));

  app.set('trust proxy', true);

  app.use(
    session({
      name: 'access_token',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 daysm
      },
      proxy: true
    })
  );

  const logFormat = isProduction() ? 'combined' : 'dev';
  app.use(morgan(logFormat, { stream: new LogStream() }));

  const schema = await generateSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: SessionRequest }) => ({ req })
  });

  server.applyMiddleware({ app, cors: corsOptions });

  app.listen({ port: 4000 }, () =>
    logger.info(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  startServer();
} catch (e) {
  logger.error('Unexpected error occured:', e);
}
