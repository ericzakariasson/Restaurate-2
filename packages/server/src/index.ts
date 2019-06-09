import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { config } from './ormconfig';

import { schema } from './schema';

const startServer = async (): Promise<void> => {
  const connection = await createConnection(config as any);

  if (connection) {
    console.log('Established connection');
  }

  const app = express();

  const server = new ApolloServer({
    schema: await schema,
    context: ({ req }: { req: Request }) => ({ req })
  });

  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

try {
  startServer();
} catch (e) {
  console.error(e);
}
