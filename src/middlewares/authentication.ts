import { Request, Response } from 'express';

import firebase from '../initializers/firebase';

/**
 * Validates that the request has a req.headers.authorization header or req.headers['Authorization']
 * @param req 
 * @param res 
 * @param next 
 */
export const decodeFirebaseToken = async(req: Request, res: Response, next: Function) => {
  if (!req.headers.authorization) {
    return res.status(400).json({
      error: {
        message: 'Bearer token not specified in the header of the request'
      }
    });
  }

  try {
    const { autorization: headerToken } = req.headers;
    const splitToken = (headerToken as string).split(' ');
    if (splitToken[0] !== 'Bearer' || typeof splitToken[1] !== 'string') {
      return res.status(400).json({
        error: {
          message: 'Authorization header has the wrong format.'
        }
      });
    }
    const userPayload = await firebase.auth().verifyIdToken(splitToken[1]);
    req.user = userPayload;
    next();
  } catch(error) {
    return res.status(500).json({
      error
    });
  }
}

// Checks if a user is authenticated from firebase admin
export const isAuthorized = async (req: Request, res: Response, next: Function) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({
      error: {
        message: 'You are not authorised to perform this action. SignUp/Login to continue'
      }
    });
  }
};
