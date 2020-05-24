import * as Joi from '@hapi/joi';

export const ChangeVoucherOption = Joi.array().items(Joi.object({
    op: Joi.string().required().allow('add', 'remove', 'replace'),
    field: Joi.string(),
    value: Joi.any()
}));