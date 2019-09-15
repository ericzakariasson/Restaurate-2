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
    synchronize: false,
    migrationsRun: true,
    entities: ['dist/modules/**/*.entity.js'],
    migrations: ['dist/migration/**/*.js'],
    subscribers: ['dist/subscriber/**/*.js'],
    cli: {
      migrationsDir: 'dist/migration',
      subscribersDir: 'dist/subscriber'
    }
  }
];
