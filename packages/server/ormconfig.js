/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config({ path: path.resolve('../../.env') });

const isProd = process.env.NODE_ENV === 'production';

const rootDir =
  require.main && require.main.filename.includes('app')
    ? path.resolve(require.main.path, '../')
    : process.cwd();

console.log('ormconfig rootDir', rootDir);

module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: !isProd,
  logging: !isProd,
  charset: 'UTF8MB4_GENERAL_CI',
  entities: [`${rootDir}/dist/interfaces/gateways/**/orm.js`],
  migrations: [`${rootDir}/dist/migrations/*.js`],
  cli: {
    migrationsDir: path.relative(process.cwd(), `${rootDir}/src/migrations`),
  },
};
