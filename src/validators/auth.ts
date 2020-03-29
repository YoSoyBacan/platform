import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateUserValidator = Joi.object({
  email: Joi.string().email().required(),
  countryCode: Joi.string().required(),
  phoneNumber: Joi.string().min(9).max(15).required(),
  type: Joi.string().allow(Constants.UserType.BUSINESS, Constants.UserType.CONSUMER),
  authMethod: Joi.string().allow(Constants.AuthMethods.EMAIL, Constants.AuthMethods.TELEFONO, Constants.AuthMethods.GOOGLE, Constants.AuthMethods.FACEBOOK),
  password: Joi.string().min(3).max(15).required()
});
