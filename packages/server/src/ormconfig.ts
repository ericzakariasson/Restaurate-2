import { ConnectionOptions } from 'typeorm';

export const configs: ConnectionOptions[] = [
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'restaurate',
    synchronize: true,
    dropSchema: true,
    logging: false,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  },
  {
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: false,
    entities: ['src/modules/**/*.entity.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber'
    }
  }
];
