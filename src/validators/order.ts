import * as Joi from '@hapi/joi';

import * as Constants from '../util/constants';

export const CreateOrderValidator = Joi.object({
    paymentMethod: Joi.string().required(),
    status: Joi.string().required(),
    currency: Joi.string().allow(Constants.Currency.USD, Constants.Currency.COP).required(),
    token: Joi.string().required(),
    checkoutId: Joi.string().required(),
    accountId: Joi.string().required(),
    vouchersInOrder: Joi.array().items(
        Joi.object({
            businessId: Joi.string().required(),
            amountPaid: Joi.string().required(),
            amountToRedeem: Joi.string().required(),
            discount: Joi.string().required()
        }).required()
    ).required(),
    notification: Joi.string(),
    buenPlanBody: Joi.array().items(
        Joi.object({
            businessId: Joi.string().required(),
            amount: Joi.number().required(),
        }).required()
    )
});