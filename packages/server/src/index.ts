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

dotenv.config();

const startServer = async (): Promise<void> => {
  useContainer(Container);
  const connection = await createConnection();

  if (!connection) {
    console.error('Could not established connection to database');
  }

  const app = express();

  const allowedOrigins = (process.env.ALLOWED_ORIGINS as string)
    .split(',')
    .map(str => str.trim());

  console.log('Allowed origins: ', allowedOrigins);

  const corsOptions = {
    credentials: true,
    origin: '*'
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
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  const schema = await generateSchema();

  const server = new ApolloServer({
    schema,
    context: ({ req }: { req: SessionRequest }) => ({ req })
  });

  server.applyMiddleware({ app, cors: corsOptions });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  startServer();
} catch (e) {
  console.log('Error occured:', JSON.stringify(e, null, 4));
}
