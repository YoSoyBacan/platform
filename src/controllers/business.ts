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
        businessPersonName: string, 
        businessPersonId: string, 
        businessCountry: Constants.CountryOptions,
        businessEmail: string, 
        legalName: string, 
        businessLegalId: string,
        numEmployees: number, 
        businessAddress: string, 
        businessCity: string, 
        entityType: Constants.EntityType,
        hasAccounting: boolean, 
        businessPhone: string, 
        businessLink: string,
        bankName: Constants.BankOptions,
        bankAccountNumber: string,
        bankAccountType: Constants.BankAccountType, 
        bankBeneficiaryName: string,
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
                    businessLegalId: req.body.businessLegalId
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
        let businessBitLink;

        try {
          let result = await bitly.shorten(req.body.businessLink);
          businessBitLink = result.link;
          console.log(`Your shortened bitlink is ${businessBitLink}`);
        } catch(e) {
          throw e;
        }
    
        const newBusiness = new Business({
            businessPersonName: req.body.businessPersonName,
            businessPersonId: req.body.businessPersonId,
            businessCountry: req.body.businessCountry, 
            businessEmail: req.body.businessEmail,
            legalName: req.body.legalName,
            businessLegalId: req.body.businessLegalId,
            numEmployees: req.body.numEmployees,
            businessAddress: req.body.businessAddress,
            businessCity: req.body.businessCity, 
            entityType: req.body.entityType,
            hasAccounting: req.body.hasAccounting,
            businessPhone: req.body.businessPhone,
            businessLink: businessBitLink,
            bankName: req.body.bankName,
            bankAccountNumber: req.body.bankAccountNumber,
            bankAccountType: req.body.bankAccountType, 
            bankBeneficiaryName: req.body.bankBeneficiaryName,
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