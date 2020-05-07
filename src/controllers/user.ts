import { Request, Response, Router } from 'express';
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

import firebase from '../initializers/firebase';
import { Account, Business, User } from '../models';
import * as Constants from '../util/constants';
import * as AuthValidators from '../validators/user';
import { apiWrapper, RequestFailure, ResponseCode } from './common';

const router = Router({ mergeParams: true });
const validator = createValidator();

// Schemas
interface CreateUserSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    firstName: string;
    lastName: string;
    email: string;
    countryCode: string;
    phoneNumber: string;
    type: Constants.UserType;
    authMethod: Constants.AuthMethods;
    password: string;
  };
}

const doCreateUser = apiWrapper.bind(
  apiWrapper,
  "POST:/api/user",
  async (req: ValidatedRequest<CreateUserSchema>, res: Response) => {
    // Check the user doesn't exist
    const foundUser = await User.findOne({
      $or: [
        {
          email: req.body.email,
        },
        {
          phoneNumber: req.body.phoneNumber,
        },
      ],
    });

    if (foundUser) {
      const firebaseUser = await firebase.auth().getUser(foundUser._id.toString());
      // TODO[sebastian]: Find a better way to do this.
      // const err: RequestFailure = {
      //   code: ResponseCode.ERROR_FORBIDDEN,
      //   error: true,
      //   referenceId: res.locals.sequenceId,
      //   message: `Usuario con email ${req.body.email} y telefono ${req.body.phoneNumber} ya se encuentra registrado, por favor inicia sesion`,
      // };
      // return res.status(400).json(err);
      return res.status(200).json(firebaseUser);
    }

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      type: req.body.type,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      countryCode: req.body.countryCode,
      authMethod: req.body.authMethod,
    });
    await newUser.save();
    const id = newUser._id.toString();
    // Save the firebase user
    try {
      const firebaseUser = await firebase.auth().createUser({
        uid: id,
        displayName: `${req.body.firstName} ${req.body.lastName}`,
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        disabled: false,
      });
      return res.status(200).json(firebaseUser);
    } catch(firebaseError) {

      let error_message = firebaseError.errorInfo.message;
      if (firebaseError.errorInfo.message == "The email address is already in use by another account.") {
        error_message = "La cuenta vinculada a este email y telefono ya está registrada."
      } else if (firebaseError.errorInfo.message == "The password must be a string with at least 6 characters.") {
        error_message = "Tu contraseña debe tener mínimo 6 caracteres."
      }

      
      const err: RequestFailure = {
        code: ResponseCode.ERROR_UNKNOWN,
        error: true,
        referenceId: res.locals.sequenceId,
        message: (error_message),
      };

      // Delete user
      await User.findOneAndDelete({
        _id: newUser._id,
      });
      return res.status(400).json(err);
    }
  }
);
const doGetUser = apiWrapper.bind(
  apiWrapper,
  "GET:/api/user/:userId",
  async (req: Request, res: Response) => {
    const user = await User.findById(req.params.userId).lean();
    if (user.type === Constants.UserType.BUSINESS) {
      const business = await Business.findOne({
        owner: req.params.userId,
      }).lean();

      const response = {
        user: {
          ...user,
        },
        business: {
          ...business,
        },
      };
      return res.json(response);
    }
    if (user.type === Constants.UserType.CONSUMER) {
      const account = await Account.findOne({
        user: req.params.userId,
      });
      const response = {
        account: {
          ...account,
        },
        user: {
          ...user,
        },
      };
      return res.json(response);
    }
    return res.status(404).json({
      message: "Not Found",
    });
  }
);


router.post("/", validator.body(AuthValidators.CreateUserValidator), doCreateUser);
router.get("/:userId", doGetUser);
export default router;
