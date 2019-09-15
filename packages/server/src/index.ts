import 'reflect-metadata';
import * as express from 'express';
import * as session from 'express-session';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';

import { configs } from './ormconfig';

import { generateSchema } from './schema';
import { insertUser } from './seed';
import { isDevelopment } from 'apollo-utilities';
import { SessionRequest } from './graphql/types';

dotenv.config();

const startServer = async (): Promise<void> => {
  const isDev = isDevelopment();

  const config =
    configs.find(c => c.name === process.env.NODE_ENV) || configs[0];
  const connection = await createConnection(config);

  if (isDev) {
    await insertUser();
  }

  if (!connection) {
    console.error('Could not established connection to database');
  }

  const app = express();

  const corsOptions = {
    credentials: true,
    origin: ['*']
  };

  app.use(cors(corsOptions));

  app.use(
    session({
      name: 'access_token',
      secret: process.env.SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: (process.env.NODE_ENV as string) === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const schema = await generateSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: SessionRequest }) => ({ req }),
    playground: true
  });

  server.applyMiddleware({ app, cors: corsOptions });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  startServer();
} catch (e) {
  console.log(JSON.stringify(e, null, 4));
}
