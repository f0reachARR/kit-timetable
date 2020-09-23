/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

require('dotenv').config({ path: path.resolve('../../.env') });

const isProd = process.env.NODE_ENV === 'production';

const rootDir = process.cwd();
module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: !isProd,
  logging: !isProd,
  entities: [`${rootDir}/dist/interfaces/gateways/**/orm.js`],
  migrations: [`${rootDir}/dist/migrations/*.js`],
  cli: {
    migrationsDir: `${rootDir}/src/migrations`,
  },
};
