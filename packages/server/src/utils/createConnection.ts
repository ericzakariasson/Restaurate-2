import { createConnection as createTypeOrmConnection } from 'typeorm';

import { configs } from '../ormconfig';

export const createConnection = () => {
  const connectionOptions = configs.find(c => c.name === process.env.NODE_ENV);

  if (!connectionOptions) {
    throw new Error(`No connection options for ${process.env.NODE_ENV} found`);
  }

  return createTypeOrmConnection({ ...connectionOptions, name: 'default' });
};
