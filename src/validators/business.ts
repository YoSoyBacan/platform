import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateBusinessValidator = Joi.object({
  businessPersonName: Joi.string().required(),
  businessPersonId: Joi.string().required(),
  businessCountry: Joi.string().allow(Constants.CountryOptions.COLOMBIA, Constants.CountryOptions.ECUADOR),
  businessEmail: Joi.string().required(),
  legalName: Joi.string().required(),
  businessLegalId: Joi.string().required(),
  numEmployees: Joi.number().required(),
  businessAddress: Joi.string().required(),
  businessCity: Joi.string().required(),
  entityType: Joi.string().allow(Constants.EntityType.PERSONA_JURIDICA, Constants.EntityType.PERSONA_NATURAL),
  hasAccounting: Joi.bool().required(),
  businessPhone: Joi.string().min(7).required(),
  businessRegisteredAt: Joi.date().required(),
  bankName: Joi.string().allow(Constants.BankOptions.BANCO_PACIFICO, Constants.BankOptions.GUAYAQUIL, Constants.BankOptions.PICHINCHA, Constants.BankOptions.PRODUBANCO).required(),
  bankAccountNumber: Joi.string().required(),
  bankAccountType: Joi.string().allow(Constants.BankAccountType.AHORROS, Constants.BankAccountType.CORRIENTE),
  bankBeneficiaryName: Joi.string().required(),
  owner: Joi.string().required()
});


export const ChangeBusinessValidator = Joi.array().items(Joi.object({
  op: Joi.string().required().allow('add', 'remove', 'replace'),
  field: Joi.string(),
  value: Joi.any()
}));