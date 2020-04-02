import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateBusinessValidator = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  businessTelephone: Joi.string().max(7).required(),
  businessEmail: Joi.string().required(),
  industry: Joi.string().allow(Constants.Industries.RESTAURANT),
  businessRegisteredAt: Joi.date().required(),
  businessDescription: Joi.string().required(),
  percentageDiscount: Joi.string().allow(Constants.PercentageDiscount.FIFTEEN_PERCENT, Constants.PercentageDiscount.TWENTY_PERCENT, Constants.PercentageDiscount.TWENTY_FIVE_PERCENT, Constants.PercentageDiscount.THIRTY_PERCENT, Constants.PercentageDiscount.THIRTY_FIVE_PERCENT),
  avatarImageUrl: Joi.string().dataUri().required(), //? DANI
  voucherOptions: Joi.array().items(Joi.string()).required(),
  legalId: Joi.string().min(10).max(13).required(),
  bank: Joi.string().allow(Constants.BankOptions.BANCO_PACIFICO, Constants.BankOptions.GUAYAQUIL, Constants.BankOptions.PICHINCHA, Constants.BankOptions.PRODUBANCO),
  accountNumer: Joi.string().required(),
  owner: Joi.string().required()
});
