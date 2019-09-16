import { createConnection as createTypeOrmConnection } from 'typeorm';

import * as configs from '../ormconfig';

export const createConnection = () => {
  const connectionOptions =
    configs.find(c => c.name === process.env.NODE_ENV) || configs[0];

  return createTypeOrmConnection({ ...connectionOptions, name: 'default' });
};
