import mongoose from 'mongoose';
import config from '../config';
import utils from '../utils';

const { logger } = utils;
const currentEnv = process.env.NODE_ENV || 'development';
const { dbUrl } = config[currentEnv];

logger.info(`Start setting up database for ${currentEnv} environment`);
mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.connection.on('error',
  error => logger.error('MongoDB connection error: ', error));
mongoose.Promise = global.Promise;
logger.info('Finished setting up database');
