import dotenv from 'dotenv';
import fs from 'fs';

import logger from './logger';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else {
    logger.debug('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
// const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

// export const SESSION_SECRET = process.env['SESSION_SECRET'];
// export const GOOGLE_APPLICATION_CREDENTIALS = process.env['GOOGLE_APPLICATION_CREDENTIALS'];
// export const REDIS_HOST = process.env['REDIS_HOST'];
// export const REDIS_PORT = process.env['REDIS_PORT'];
// export const REDIS_PASSWORD = process.env['REDIS_PASSWORD'];

// if (!SESSION_SECRET) {
//     logger.error('No client secret. Set SESSION_SECRET environment variable.');
//     process.exit(1);
// }

// if (!GOOGLE_APPLICATION_CREDENTIALS) {
//     logger.error('No Firebase GOOGLE_APPLICATION_CREDENTIALS environment variable set, exiting the application');
//     process.exit(1);
// }

// if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
//     logger.error('Missing redis configuration variables REDIS_HOST, REDIS_PORT, REDIS_PASSWORD');
//     process.exit(1);
// }
