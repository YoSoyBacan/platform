import { Response, Router } from 'express';
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

import firebase from '../initializers/firebase';
import { User } from '../models';
import * as Constants from '../util/constants';
import * as AuthValidators from '../validators/auth';
import { apiWrapper, RequestFailure, ResponseCode } from './common';

const router = Router({ mergeParams: true });
const validator = createValidator();

// Schemas
interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    email: string,
    countryCode: string,
    phoneNumber: string,
    type: Constants.UserType,
    authMethod: Constants.AuthMethods,
    password: string,
  }
};

const doCreateUser  = apiWrapper.bind(
  apiWrapper,
  'POST:/api/user',
  validator.body(AuthValidators.CreateUserValidator),
  async (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
    // Check the user doesn't exist
    const foundUser = await User.findOne({
      $or: [
        {
          email: req.body.email
        },
        {
          phoneNumber: req.body.phoneNumber
        }
      ]
    });
    if (foundUser) {
      const err: RequestFailure = {
        code: ResponseCode.ERROR_FORBIDDEN,
        error: true,
        referenceId: res.locals.sequenceId,
        message: `Usuario con email ${req.body.email} y telefono ${req.body.phoneNumber} ya se encuentra registrado, por favor inicia sesion`
      };

      return res.status(400).json(err);
    }

    const newUser = new User({
      type: req.body.type,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
      authMethod: req.body.authMethod
    });
    await newUser.save();

    // Save the firebase user
    const firebaseUser = await firebase.auth().createUser({
      uid: newUser._id,
      email: req.body.email,
      emailVerified: false,
      phoneNumber: `+${req.body.countryCode}${req.body.phoneNumber}`,
      password: req.body.password,
      disabled: false
    });
    if (!firebaseUser) {
      const err: RequestFailure = {
        code: ResponseCode.ERROR_UNKNOWN,
        error: true,
        referenceId: res.locals.sequenceId,
        message: 'Error guardando usuario, por favor intentalo mas tarde'
      };

      // Delete user
      await User.findOneAndDelete({
        _id: newUser._id
      });
      return res.status(400).json(err);
    }
    return res.status(200).json(newUser);
  }
) 
router.post('/', doCreateUser);
export default router;