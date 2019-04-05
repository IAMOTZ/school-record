import express from 'express';
import logger from 'morgan';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes';
import config from './config';
import seeders from './seeders';

dotEnv.config();

const app = express();


const currentEnv = process.env.NODE_ENV || 'development';
const { dbUrl } = config[currentEnv];

mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', routes);

const port = process.env.PORT || 7000;


app.listen(port, async () => {
  console.log(`App listening on port ${port}`);
  await seeders();
});

export default app;
