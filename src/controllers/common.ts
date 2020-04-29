import { NextFunction, Request, Response } from 'express';
import nanoid from 'nanoid';

import logger from '../util/logger';

export enum ResponseCode {
    ERROR_INVALID_INPUT = 0,
    ERROR_FORBIDDEN = 1,
    ERROR_UNKNOWN_RESOURCE = 2,
    ERROR_UNKNOWN = 3,
    ERROR_SERVER = 4,
    ERROR_MFA_CHALLENGE = 5,
    ERROR_TIMEOUT = 6
}
export interface RequestFailure {
    code: ResponseCode;
    error: true;
    referenceId: string;
    message?: string;
    payload?: {
        [key: string]: string | number | boolean;
    };
}

export async function apiWrapper(
  apiPath: string,
  execute: (req: Request, res: Response) => Promise<void>,
  req: Request,
  res: Response
) {
  try {
    logger.info(apiPath);
    await execute(req, res);
  } catch(error) {
    console.log(error);
    logger.error(error);
    const payload: RequestFailure = {
      error: true,
      code: ResponseCode.ERROR_UNKNOWN,
      referenceId: res.locals.sequenceId
    };
    res.status(400).send(payload);
    return;
  }
}

export function assignReferenceId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.locals.sequenceId = nanoid(18);
  next();
}