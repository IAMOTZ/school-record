import dotEnv from 'dotenv';

dotEnv.config();

export default {
  port: process.env.PORT,
  development: {
    dbUrl: process.env.DB_DEV_URL,
  },
  test: {
    dbUrl: process.env.DB_TEST_URL,
  },
  production: {
    dbUrl: process.env.DB_PROD_URL,
  },
};
