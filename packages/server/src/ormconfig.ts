export const config = {
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
};
