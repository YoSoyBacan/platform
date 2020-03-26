import * as Joi from '@hapi/joi';

import { ModelName } from '../models/Tag';
import * as Constants from '../util/constants';

export const CreateProductValidator = Joi.object({
  details: {
    productImage: Joi.binary().required(),
    product: {
      name: Joi.string().required(),
      category: Joi.string().required(),
      brand: Joi.string().required(),
      supplierName: Joi.string().required(),   
    },
    pricing: {
      cost: Joi.number().required(),
      price: Joi.number().required(),
      affiliatePrice: Joi.number().required(),
      margin: Joi.number().required()
    },
    extra: {
      expiryDate: Joi.number().required(),
      receivedDate: Joi.number().required(),
      unit: Joi.string().valid(...[Constants.UnitEnum.UNIDAD, Constants.UnitEnum.METRO, Constants.UnitEnum.GRAMOS, Constants.UnitEnum.KILOS]),
      quantity: Joi.string(),
      sku: Joi.string().required(),
      description: Joi.string(),
      qrCodeUrl: Joi.string(),
      barcode: Joi.string()
    }
  },
  tags: Joi.array().items({
    templateId: Joi.string().required(),
    quantity: Joi.number().greater(0).required(),
    tagModel: Joi.string().valid(...[ModelName.SL121, ModelName.SL126, ModelName.SL142])
  })
});

