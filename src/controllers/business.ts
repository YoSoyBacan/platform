import { Response, Router, Request } from 'express';
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';
import { BitlyClient } from 'bitly';

import { Business, IUser } from '../models';
import * as Constants from '../util/constants';
import * as AuthValidators from '../validators/business';
import { apiWrapper, RequestFailure, ResponseCode } from './common';
import { APIResponse } from '../lib/responseTypes';


const router = Router({ mergeParams: true });
const validator = createValidator();

// Schemas 
interface CreateBusinessSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        name: string, 
        address: string, 
        country: Constants.CountryOptions,
        city: string, 
        businessTelephone: string, 
        businessLink: string,         
        businessEmail: string, 
        industry: Constants.Industries,
        businessRegisteredAt: Date, 
        businessDescription: string,
        avatarImageUrl: string, 
        images: string,
        percentageDiscount: Constants.PercentageDiscount, 
        voucherOptions: string[], 
        vouchers: object[],
        legalId: string,
        bank: Constants.BankOptions,
        accountNumber: string,
        owner: string,
    }
};

interface UpdateBusinessSchema extends ValidatedRequestSchema {
  [ContainerTypes.Body]: Array<{
    op: string, 
    field: string,
    value: any
  }>
}

const doCreateBusiness = apiWrapper.bind(
    apiWrapper, 
    'POST:/api/business',
    async (req: ValidatedRequest<CreateBusinessSchema>, res: Response) => {
        // Check the business doesn't exist 
        const foundBusiness = await Business.findOne({
            $or: [
                {
                    businessEmail: req.body.businessEmail
                },
                {
                    legalId: req.body.legalId
                }
            ]
        });
        if (foundBusiness) {
            const err: RequestFailure = {
                code: ResponseCode.ERROR_FORBIDDEN,
                error: true,
                referenceId: res.locals.sequenceId,
                message: `El negocio con estos credenciales ya ha sido registrado`
            };

            return res.status(400).json(err);
        }

    //TODO DANI do a function that creates a link before writing to the db use it with bit.ly
        const bitly = new BitlyClient(process.env['BITLY_ACCESS_TOKEN'], {});
        console.log(bitly);
        let businessBitLink;

        try {
          let result = await bitly.shorten('https://github.com/tanepiper/node-bitly');
          businessBitLink = result.link;
          console.log(`Your shortened bitlink is ${businessBitLink}`);
        } catch(e) {
          throw e;
        }
    
        const newBusiness = new Business({
            name: req.body.name,
            address: req.body.address,
            country: req.body.country, 
            city: req.body.city, 
            businessTelephone: req.body.businessTelephone,
            businessLink: businessBitLink,
            businessEmail: req.body.businessEmail, 
            industry: req.body.industry,
            businessRegisteredAt: req.body.businessRegisteredAt,
            businessDescription: req.body.businessDescription,
            percentageDiscount: req.body.percentageDiscount,
            avatarImageUrl: req.body.avatarImageUrl,
            voucherOptions: req.body.voucherOptions,
            legalId: req.body.legalId,
            bank: req.body.bank,
            accountNumber: req.body.accountNumber,
            owner: req.body.owner
        });
        await newBusiness.save();

        // Delete business 
        return res.status(200).json(newBusiness);
    }   
)


const doChangeBusiness = apiWrapper.bind(
  apiWrapper, 
  'PUT:/api/business/:businessId', 
  async (req: ValidatedRequest<UpdateBusinessSchema>, res: Response) => {
    const business = await Business.findById(req.params.businessId);

    for (const op of req.body) {
      if (op.op === 'add' || op.op === 'replace') {
        (business as any)[op.field] = op.value;
      } else if (op.op === 'remove') {
        delete (business as any)[op.field]
      }
    }

    await business.save();
    return res.json(business);

  }
);

router.post('/', validator.body(AuthValidators.CreateBusinessValidator), doCreateBusiness);
router.put('/:businessId', validator.body(AuthValidators.ChangeBusinessValidator), doChangeBusiness);

export default router;