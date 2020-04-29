import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateAccountValidator = Joi.object({
  country: Joi.string().allow(Constants.CountryOptions.COLOMBIA, Constants.CountryOptions.ECUADOR).required,
  user: Joi.object().required
});
