import 'moment/locale/es';

import errorHandler from 'errorhandler';
import http from 'http';
import moment from 'moment';
import momentTz from 'moment-timezone';

import app from './app';
import { initDatabase } from './initializers/mongo';
import logger from './util/logger';

const PROCESS_EXIT_TIMEOUT = 5000;

moment.locale('es');
momentTz.tz.setDefault('America/Bogota');

// TODO[sebastian]: Remove for production
/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());    

export async function startServer(withProcess: boolean = true) {
    await initDatabase();
    const server = http.createServer(app);

    if (withProcess) {
        await server.listen(app.get('port'));
        logger.info(`App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    }

    return {
        app,
        server
    };
}

function _destroy() {
    console.error('Destroying application...');
  
    setTimeout(() => {
      logger.info(
        `Timeout exceeded (${PROCESS_EXIT_TIMEOUT} ms). Process will terminate now.`
      );
      process.exit(-1);
    }, PROCESS_EXIT_TIMEOUT);
}

function _handleUncaughtException(err: Error) {
    logger.error('Uncaught exception encountered:', err);
    // Application is in an undefined state. Destroy it.
    _destroy();
}


process.on('unhandledRejection', _handleUncaughtException);
process.on('uncaughtException', _handleUncaughtException);
