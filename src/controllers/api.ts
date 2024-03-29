'use strict';
import { NextFunction, Request, Response } from 'express';
import graph from 'fbgraph';


// import { UserDocument } from "../models/User";


/**
 * GET /api
 * List of API examples.
 */
export const getApi = (req: Request, res: Response) => {
    res.render('api/index', {
        title: 'API Examples'
    });
};

/**
 * GET /api/facebook
 * Facebook API example.
 */
export const getFacebook = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    const token = user.tokens.find((token: any) => token.kind === 'facebook');
    graph.setAccessToken(token.accessToken);
    graph.get(`${user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
        if (err) { return next(err); }
        res.render('api/facebook', {
            title: 'Facebook API',
            profile: results
        });
    });
};
