import dotenv from 'dotenv';
import server from './http/server';
import config from './config';
import seeder from './seeder';
import utils from './utils';

dotenv.config();

const { logger } = utils;
const port = config.port || 7000;

server.listen(port, async () => {
  logger.info('server running on port: ', port);
  await seeder();
});
