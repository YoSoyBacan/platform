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
        percentageDiscount: Constants.PercentageDiscount,
        avatarImageUrl: string, 
        voucherOptions: string[], 
        legalId: string,
        bank: Constants.BankOptions,
        accountNumer: string,
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
            accountNumer: req.body.accountNumer,
            owner: req.body.owner
        });
        await newBusiness.save();

        // Delete business 
        return res.status(200).json(newBusiness);
    }   
)

const doGetBusiness = apiWrapper.bind(
  apiWrapper, 
  'GET:/api/business/:businessId',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("owner");
    const user = (business.owner as any) as IUser;
  
    const response: APIResponse.BusinessResponse = {
      data: {
        informacion_del_negocio: {
          nombre: business.name, 
          direccion: business.address,
          fecha_de_registro: business.businessRegisteredAt,
          telefono: business.businessTelephone,
          ciudad: business.city,
          pais: business.country,
          email: business.businessEmail,
          industria: business.industry,
          link: business.businessLink,
          avatar: business.avatarImageUrl, 
          imagenes: business.images,
          legalId: business.legalId,
          banco: business.bank,
          numero_de_cuenta: business.accountNumer
        },
        informacion_del_usuario: {
          nombre: `${user.firstName} ${user.lastName}`,
          email: user.email,
          numero: user.phoneNumber,
          codigo_del_pais: user.countryCode
        } 
      }
    }

    return res.json(response);
  }
);

const doChangeBusiness = apiWrapper.bind(
  apiWrapper, 
  'PUT:/api/business/:businessId', 
  validator.body(AuthValidators.ChangeBusinessValidator),
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

router.post('/', doCreateBusiness);
router.get('/:businessId', doGetBusiness);
router.put('/:businessId', doChangeBusiness);

export default router;