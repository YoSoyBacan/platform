import { Response, Router } from 'express';
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

import { Account, User } from '../models';
import { apiWrapper } from './common';
import { request } from 'http';
import * as AuthValidators from '../validators/account';

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

// Schemas 
interface CreateAccountSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    firstName: string,
    lastName: string,
    country: string,
    user: string,
  }
};

const doCreateAccount = apiWrapper.bind(
  apiWrapper, 
  'POST:/api/business',
  async (req: ValidatedRequest<CreateAccountSchema>, res: Response) => {
    //Check the account doesn't exist already and there exists a User for this account 
    const foundUser = await User.findOne({
      $and: [
        
      ]
    })
  }
)

router.post('/business', validator.body(AuthValidators.CreateAccountValidator), doCreateAccount);