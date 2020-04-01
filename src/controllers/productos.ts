// import Big from 'big.js';
// import { Request, Response, Router } from 'express';
// import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
// import multer from 'multer';

// import SunmiClient from '../lib/clients/sunmi';
// import { Product, Tag } from '../models';
// import { ModelName } from '../models/Tag';
// import * as Constants from '../util/constants';
// import * as ProductValidators from '../validators/products';
// import { getConfig } from './../config';
// import { apiWrapper, RequestFailure } from './common';

// const router = Router({ mergeParams: true });
// const config = getConfig();
// const validator = createValidator();
// const uploadFile = multer({
//   storage: multer.memoryStorage()
// });

// // Validators

// interface CreateProductSchema extends ValidatedRequestSchema {
//   [ContainerTypes.Body]: {
//     details: {
//       productImage: any,
//       product: {
//         name: string,
//         category: string,
//         brand: string,
//         supplierName: string
//       },
//       pricing: {
//         cost: number;
//         price: number;
//         affiliatePrice: number;
//         margin: number;
//       },
//       extra: {
//         expiryDate: number;
//         receivedDate: number;
//         unit?: Constants.UnitEnum;
//         quantity?: string;
//         description?: string;
//         qrCodeUrl?: string;
//         barcode?: string
//       }
//     },
//     tags: Array<{
//       templateId: string;
//       quantity: number;
//       tagModel: ModelName
//     }>
//   }
// }
// const doProductBoundEsl = apiWrapper.bind(
//   apiWrapper,
//   'GET:/api/products/:id/boundEsl',
//   async (req: Request, res: Response) => {
//     const { id: product_id } = req.params;

//     const eslList = await SunmiClient.getProductBoundEsl({
//       shop_id: config.shop_id,
//       product_id,
//     });

//     return res.json(eslList);
//   }
// );

// const doGetProductList = apiWrapper.bind(
//   apiWrapper,
//   'GET:/api/products/',
//   async (req: Request, res: Response) => {
//     const productList = await SunmiClient.getProductList({
//       shop_id: config.shop_id
//     });
//     return res.json(productList);
//   }
// );

// const doGetProductInfo = apiWrapper.bind(
//   apiWrapper,
//   'GET:/api/products/:id',
//   async (req: Request, res: Response) => {
//     const { id: product_id } = req.body;
//     const productDetails = await SunmiClient.getProductInfo({ shop_id: config.shop_id, product_id });
//     return res.json(productDetails);
//   }
// );

// const doUpdateProductTemplate = apiWrapper.bind(
//   apiWrapper,
//   'PATCH: /api/products/:id/template',
//   async (req: Request, res: Response) => {
//     const { template_id } = req.body;
//     const { id: product_id } = req.body;
//     const templateUpdate = await SunmiClient.patchProductTemplate({
//       product_id,
//       template_id,
//       shop_id: config.shop_id
//     });
//     return res.json(templateUpdate);
//   }
// );

// const doCreateProduct = apiWrapper.bind(
//   apiWrapper,
//   'POST: /api/productos/',
//   validator.body(ProductValidators.CreateProductValidator),
//   uploadFile.single('productImage'),
//   async (req: ValidatedRequest<CreateProductSchema>, res: Response) => {

    
//     // Create the product in our DB
//     const product = new Product({
//       name: req.body.details.product.name,
//       brand: req.body.details.product.brand,
//       supplierName: req.body.details.product.supplierName,
//       dateReceived: req.body.details.extra.receivedDate,
//       expiryDate: req.body.details.extra.expiryDate,
//       subtotal: Number(Big(req.body.details.pricing.price).times(1 - Constants.ECUADOR_TAX_RATE).toString()),
//       subtotalDiscount: 0,
//       subtotalMember: Number(Big(req.body.details.pricing.affiliatePrice).times(1 - Constants.ECUADOR_TAX_RATE).toString()),
//       cost: Number(req.body.details.pricing.cost),
//       unit: req.body.details.extra.unit,
//       quantity: 1, // TODO[sebastian] Change quantity with integrations
//       barcode: req.body.details.extra.barcode,
//       category: req.body.details.product.category,
//       qrCodeUrl: req.body.details.extra.qrCodeUrl
//     });
//     // TODO: Upload image to Bucket
//     // const { file } = req;

//     await product.save();
    

//     // Create the product in Sunmi
//     // Generate a random id to be the sunmi product Id
    
//     const productResponse = await SunmiClient.createProduct({
//       shop_id: config.shop_id,
//       product_list: [{
//         id: product._id,
//         name: product.name,
//         price: Number(req.body.details.pricing.price),
//         bar_code: req.body.details.extra.barcode,
//         member_price: String(req.body.details.pricing.affiliatePrice),
//         category_name: req.body.details.product.category,
//         unit: req.body.details.extra.unit,
//         brand: req.body.details.product.brand,
//         qr_code: req.body.details.extra.qrCodeUrl,
//         expire_time: String(req.body.details.extra.expiryDate)
//       }]
//     });
//     if (productResponse.code !== 0) {
//       const errPayload: RequestFailure = {
//         code: 3,
//         error: true,
//         referenceId: res.locals.sequenceId,
//         message: 'Unexpected error creating underlying resource'
//       };
//       return res.status(400).json(errPayload);
//     }


//     // Bind the products to the specified tags
//     for (const tagOption of req.body.tags) {
//       const tagModels = await Tag.find({
//         modelRef: tagOption.tagModel
//       }, null, {
//         limit: tagOption.quantity
//       });
//       if (tagModels.length !== tagOption.quantity) {
//         // We don't have enough tags for this model,
//         // TODO[sebastian]: Send an error
//         break;
//       }

//       for (const tagInstance of tagModels) {
//         await SunmiClient.bindProductToEsl({
//           shop_id: config.shop_id,
//           product_id: product._id,
//           template_id: tagOption.templateId,
//           esl_id: tagInstance.providerId
//         });
//       }

//     }
//     return res.json(product);
//   }
// );
// router.get('/:id/boundEsl', doProductBoundEsl);
// router.patch('/:id/template', doUpdateProductTemplate);
// router.get('/:id', doGetProductInfo);
// router.get('/', doGetProductList);
// router.post('/', doCreateProduct);

// export default router;