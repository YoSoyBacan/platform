import { BitlyClient } from 'bitly';
import { Request, Response, Router } from 'express';
import {
  ContainerTypes,
  createValidator,
  ExpressJoiError,
  ValidatedRequest,
  ValidatedRequestSchema,
} from 'express-joi-validation';

import BuenPlanAPI from '../lib/clients/buenplan';
import { Business } from '../models';
import * as Constants from '../util/constants';
import * as AuthValidators from '../validators/business';
import { apiWrapper, RequestFailure, ResponseCode } from './common';

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

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
        businessRegisteredAt: Date,
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

        // Create the Business in Buen Plan
        console.log('Sending Buen Plan Request');
        const { data } = await BuenPlanAPI.post<{id: string}>('businesses', {
          businessPersonName: req.body.businessPersonName,
          businessPersonId: req.body.businessPersonId,
          businessEmail: req.body.businessEmail,
          legalName: req.body.legalName,
          businessLegalId: req.body.businessLegalId,
          numEmployees: req.body.numEmployees,
          businessAddress: req.body.businessAddress,
          businessCity: req.body.businessCity.toLocaleUpperCase(), 
          entityType: req.body.entityType,
          hasAccounting: req.body.hasAccounting,
          businessPhone: req.body.businessPhone,
          bankName: { name: req.body.bankName },
          businessRegisteredAt: new Date(req.body.businessRegisteredAt || 0).toLocaleString(),
          bankAccountNumber: req.body.bankAccountNumber,
          bankAccountType: req.body.bankAccountType, 
          bankBeneficiaryName: req.body.bankBeneficiaryName,
        });

        const newBusiness = new Business({
            businessPersonName: req.body.businessPersonName,
            businessPersonId: req.body.businessPersonId,
            businessCountry: req.body.businessCountry || Constants.CountryOptions.ECUADOR, 
            businessEmail: req.body.businessEmail,
            legalName: req.body.legalName,
            businessLegalId: req.body.businessLegalId,
            numEmployees: req.body.numEmployees,
            businessAddress: req.body.businessAddress,
            businessCity: req.body.businessCity.toLocaleUpperCase(), 
            entityType: req.body.entityType,
            hasAccounting: req.body.hasAccounting,
            businessPhone: req.body.businessPhone,
            bankName: req.body.bankName,
            businessRegisteredAt: new Date(req.body.businessRegisteredAt || 0),
            bankAccountNumber: req.body.bankAccountNumber,
            bankAccountType: req.body.bankAccountType, 
            bankBeneficiaryName: req.body.bankBeneficiaryName,
            owner: req.body.owner,
            buenPlanProviderId: data.id
        });
        await newBusiness.save();

        return res.status(200).json(newBusiness);
    }   
)


const doChangeBusiness = apiWrapper.bind(
  apiWrapper, 
  'PUT:/api/business/:businessId', 
  async (req: ValidatedRequest<UpdateBusinessSchema>, res: Response) => {
    const business = await Business.findById(req.params.businessId);
    const bitly = new BitlyClient(process.env['BITLY_ACCESS_TOKEN'], {});

    for (const op of req.body) {
      if (op.op === 'add' || op.op === 'replace') {
        let value = op.value;
        if (op.field === 'businessLink') {
          // Bitly link
          value = await bitly.shorten(value);
        }
        (business as any)[op.field] = op.value;
      } else if (op.op === 'remove') {
        delete (business as any)[op.field]
      }
    }

    await business.save();
    return res.json(business);

  }
);

router.use((error: ExpressJoiError, req: Request, res: Response, next: Function) => {
  // Error handler for validation errors
  return res.status(427).json({
    message: error.error
  });
});

router.post('/', validator.body(AuthValidators.CreateBusinessValidator), doCreateBusiness);
router.put('/:businessId', validator.body(AuthValidators.ChangeBusinessValidator), doChangeBusiness);

export default router;