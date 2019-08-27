import express from 'express';
import morgan from 'morgan';
import routes from './routes';

const server = express();
server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use('/api/v1', routes);

export default server;
