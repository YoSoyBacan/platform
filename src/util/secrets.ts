import dotenv from 'dotenv';
import fs from 'fs';

import logger from './logger';

export const ENVIRONMENT = process.env.NODE_ENV;
console.log(ENVIRONMENT);
if (fs.existsSync('.env') && ENVIRONMENT === 'production') {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
} else if(fs.existsSync('.env.development') && ENVIRONMENT !== 'production') {
    logger.debug('Using .env.development file to supply config environment variables');
    dotenv.config({ path: '.env.development' });
} else {
    logger.debug('Using .env.example file to supply config environment variables');
    dotenv.config({ path: '.env.example' });  // you can delete this after you create your own .env file!
}
export const DB_URI = process.env.DB_URI;
// const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
// export const SESSION_SECRET = process.env['SESSION_SECRET'];
export const GOOGLE_APPLICATION_CREDENTIALS = process.env['GOOGLE_APPLICATION_CREDENTIALS'];
export const BITLY_TOKEN = process.env.BITLY_TOKEN;
export const REGISTRATION_API_KEY = process.env.REGISTRATION_API_KEY;
export const BUEN_PLAN_URL = process.env.BUEN_PLAN_URL;
export const BUEN_PLAN_API_KEY = process.env.BUEN_PLAN_API_KEY;


if (!GOOGLE_APPLICATION_CREDENTIALS) {
    logger.error('No Firebase GOOGLE_APPLICATION_CREDENTIALS environment variable set, exiting the application');
    process.exit(1);
}

// if (!REDIS_HOST || !REDIS_PORT || !REDIS_PASSWORD) {
//     logger.error('Missing redis configuration variables REDIS_HOST, REDIS_PORT, REDIS_PASSWORD');
//     process.exit(1);
// }
