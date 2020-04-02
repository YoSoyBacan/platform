import { Response, Router } from 'express';
import { ContainerTypes, createValidator, ValidatedRequest, ValidatedRequestSchema } from 'express-joi-validation';

import { Business } from '../models';
import * as Constants from '../util/constants';
import * as AuthValidators from '../validators/business';
import { apiWrapper, RequestFailure, ResponseCode } from './common';


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
        percentageDiscount: Constants.PercentageDiscount,
        avatarImageUrl: string, 
        voucherOptions: string[], 
        legalId: string,
        bank: Constants.BankOptions,
        accountNumer: string,
        owner: string,
    }
};

const doCreateBusiness = apiWrapper.bind(
    apiWrapper, 
    'POST:/api/business',
    validator.body(AuthValidators.CreateBusinessValidator),
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
    
    
        const newBusiness = new Business({
            name: req.body.name,
            address: req.body.address,
            country: req.body.country, 
            city: req.body.city, 
            businessTelephone: req.body.businessTelephone,
            businessEmail: req.body.businessEmail, 
            industry: req.body.industry,
            businessRegisteredAt: req.body.businessRegisteredAt,
            businessDescription: req.body.businessDescription,
            percentageDiscount: req.body.percentageDiscount,
            avatarImageUrl: req.body.avatarImageUrl,
            voucherOptions: req.body.voucherOptions,
            legalId: req.body.legalId,
            bank: req.body.bank,
            accountNumer: req.body.accountNumer,
            owner: req.body.owner
        });
        await newBusiness.save();

        // Delete business 
        return res.status(200).json(newBusiness);
    }   
)
router.post('/', doCreateBusiness);
export default router;