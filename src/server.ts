import 'moment/locale/es';

import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import http from 'http';
import moment from 'moment';
import momentTz from 'moment-timezone';

import app from './app';
import { initDatabase } from './initializers/mongo';
import schema from './schema';
import logger from './util/logger';

const PROCESS_EXIT_TIMEOUT = 5000;
require('./initializers/firebase');
moment.locale('es');
momentTz.tz.setDefault('America/Bogota');

const apolloServer = new ApolloServer({
    schema,
    validationRules: [depthLimit(7)],
    playground: process.env.NODE_ENV !== 'production',
    introspection: process.env.NODE_ENV !== 'production'
});
// TODO[sebastian]: Remove for production
/**
 * Error Handler. Provides full stack - remove for production
 */
// app.use(errorHandler);    

export async function startServer(withProcess: boolean = true) {
    await initDatabase();
    apolloServer.applyMiddleware({ app, path: '/graphql' });
    const server = http.createServer(app);

    if (withProcess) {
        await server.listen(app.get('port'));
        logger.info(`🚀  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
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
