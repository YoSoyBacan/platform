import { Response, Router, Request } from 'express';

import { Business, IUser } from '../models';
import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';


const router = Router({ mergeParams: true });

const doGetBusinessHome = apiWrapper.bind(
  apiWrapper, 
  'GET:/api/home/:businessId',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("owner");
    const user = (business.owner as IUser);
  
    const response: APIResponse.BusinessResponse = {
      data: {
        business_information: {
          legalName: business.legalName, 
          businessAddress: business.businessAddress,
          businessRegisteredAt: business.businessRegisteredAt,
          businessPhone: business.businessPhone,
          businessCity: business.businessCity,
          businessCountry: business.businessCountry,
          businessEmail: business.businessEmail,
          industry: business.industry,
          businessLink: business.businessLink,
          avatarImageUrl: business.avatarImageUrl, 
          images: business.images,
          businessLegalId: business.businessLegalId,
          bankName: business.bankName,
          bankAccountNumber: business.bankAccountNumber,
          businessDescription: business.businessDescription,
        },
        user_information: {
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone_number: user.phoneNumber,
          country_code: user.countryCode
        } 
      }
    }

    return res.json(response);
  }
);

router.get('/:businessId', doGetBusinessHome);

export default router;