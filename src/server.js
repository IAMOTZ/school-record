import express from 'express';
import morgan from 'morgan';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import config from './config';
import seeders from './seeders';
import logger from './logger';

dotEnv.config();

const app = express();

const currentEnv = process.env.NODE_ENV || 'development';
logger.info(`Start setting up database for ${currentEnv} environment`);
const { dbUrl } = config[currentEnv];

mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', () => logger.error('MongoDB connection error:'));
logger.info('Finished setting up database');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routes);

const port = process.env.PORT || 7000;


app.listen(port, async () => {
  logger.info(`App started on port ${port}`);
  await seeders();
});

export default app;
