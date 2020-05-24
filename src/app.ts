import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import expressWinston from 'express-winston';
import lusca from 'lusca';
import passport from 'passport';
import path from 'path';
import winston from 'winston';
import { assignReferenceId } from './controllers/common';
import { decodeFirebaseToken, isAuthorized } from './middlewares/authentication';

import businessController from './controllers/business';
import clientsController from './controllers/clientes';
import homeController from './controllers/home';
import miNegocioController from './controllers/miNegocio';
import orderController  from './controllers/order';
import userController from './controllers/user';
import ventasController from './controllers/ventas';
import voucherOptionsController from './controllers/voucherOptions';
import { decode } from 'punycode';


// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 8000);
app.use(compression());
app.use(cors());
app.use(assignReferenceId);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
// TODO[sebastian]: Add Redis session store
// app.use(session({
//     resave: true,
//     saveUninitialized: true,
//     secret: SESSION_SECRET,
//     store: new MongoStore({
//         url: mongoUrl,
//         autoReconnect: true
//     })
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.user;
  next();
});


/**
 * Logging
 */

app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize()
  ),
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms",
  colorize: true
}));
/**
 * Primary app routes.
 */
app.use("/api/business", decodeFirebaseToken, isAuthorized, businessController);
app.use("/api/clientes", decodeFirebaseToken, isAuthorized, clientsController);
app.use("/api/home", decodeFirebaseToken, isAuthorized, homeController);
app.use("/api/miNegocio", decodeFirebaseToken, isAuthorized, miNegocioController);
app.use("/api/order", decodeFirebaseToken, isAuthorized, orderController);
app.use("/api/user", decodeFirebaseToken, isAuthorized,  userController);
app.use("/api/ventas", decodeFirebaseToken, isAuthorized, ventasController);
app.use("/api/misTarjetas", decodeFirebaseToken, isAuthorized, voucherOptionsController);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect(req.session.returnTo || '/');
// });

// Serve the static files from React app
app.use(express.static(path.join(__dirname + "/../client/build/")));
/**
 * React Application
 */
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname + "/../client/build/"));
});


app.use((err: Error, req: Request, res: Response) => {
  console.log(err);
});
export default app;
