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
    country: string,
    user: string,
  }
};

const doCreateAccount = apiWrapper.bind(
  apiWrapper, 
  'POST:/api/account',
  async (req: ValidatedRequest<CreateAccountSchema>, res: Response) => {
    //Check the account doesn't exist already and there exists a User for this account 
    const foundUser = await User.findOne(req.params.user);

    // TODO keep creating account   
  }
)

router.post('/account', validator.body(AuthValidators.CreateAccountValidator), doCreateAccount);