import bodyParser from 'body-parser';
import compression from 'compression';
import express, { NextFunction, Request, Response } from 'express';
import lusca from 'lusca';
import passport from 'passport';
import path from 'path';

import { assignReferenceId } from './controllers/common';
import productosController from './controllers/productos';
import tagsController from './controllers/tags';
import templatesController from './controllers/templates';

// import templatesController from './controllers/templates';
// Controllers (route handlers)

// API keys and Passport configuration
// Create Express server
const app = express();

// Express configuration
app.set('port', process.env.PORT || 8000);
// app.set('views', path.join(__dirname, '../views'));
app.use(compression());
app.use(assignReferenceId);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
// app.use(flash());
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));
app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user;
    next();
});
// app.use((req, res, next) => {
//     // After successful login, redirect back to the intended page
//     if (!req.user &&
//     req.path !== '/login' &&
//     req.path !== '/signup' &&
//     !req.path.match(/^\/auth/) &&
//     !req.path.match(/\./)) {
//         req.session.returnTo = req.path;
//     } else if (req.user &&
//     req.path == '/account') {
//         req.session.returnTo = req.path;
//     }
//     next();
// });

/**
 * Primary app routes.
 */
// app.get("/account", passportConfig.isAuthenticated, userController.getAccount);
// app.post("/account/profile", passportConfig.isAuthenticated, userController.postUpdateProfile);
// app.post("/account/password", passportConfig.isAuthenticated, userController.postUpdatePassword);
// app.post("/account/delete", passportConfig.isAuthenticated, userController.postDeleteAccount);
// app.get("/account/unlink/:provider", passportConfig.isAuthenticated, userController.getOauthUnlink);

app.use('/api/tags', tagsController);
app.use('/api/productos', productosController);
app.use('/api/templates', templatesController);
/**
 * OAuth authentication routes. (Sign in)
 */
// app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
// app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
//     res.redirect(req.session.returnTo || '/');
// });

// Serve the static files from React app
app.use(express.static(path.join(__dirname+'/../client/build/')));


/**
 * React Application
 */
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname+'/../client/build/'));
});

export default app;
