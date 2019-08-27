import express from 'express';
import morgan from 'morgan';
import apiRoutesV1 from './api/v1/routes';
import utils from './utils';

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api/v1', apiRoutesV1);


const { logger } = utils;
const port = process.env.port || 7000;

server.listen(port, async () => {
  logger.info('server running on port: ', port);
});
