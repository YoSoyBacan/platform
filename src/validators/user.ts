import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateUserValidator = Joi.object({
  type: Joi.string().allow(Constants.UserType.BUSINESS, Constants.UserType.CONSUMER),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  countryCode: Joi.string().required(),
  authMethod: Joi.string().allow(
    Constants.AuthMethods.EMAIL,
    Constants.AuthMethods.TELEFONO,
    Constants.AuthMethods.GOOGLE,
    Constants.AuthMethods.FACEBOOK
  ).required(),
  password: Joi.string().required(),
});