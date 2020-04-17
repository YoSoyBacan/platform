import { Response, Router, Request } from 'express';

import { Business, IUser } from '../models';
import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';


const router = Router({ mergeParams: true });

const doGetBusinessHome = apiWrapper.bind(
  apiWrapper, 
  'GET:/api/:businessId/home',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("owner");
    const user = (business.owner as IUser);
  
    const response: APIResponse.BusinessResponse = {
      data: {
        business_information: {
          name: business.legalName, 
          adress: business.businessAddress,
          registered_date: business.businessRegisteredAt,
          phone_number: business.businessPhone,
          city: business.businessCity,
          country: business.businessCountry,
          email: business.businessEmail,
          industry: business.industry,
          link: business.businessLink,
          avatar: business.avatarImageUrl, 
          images: business.images,
          legalId: business.businessLegalId,
          bank: business.bankName,
          account_number: business.bankAccountNumber,
          business_description: business.businessDescription,
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

router.get('/:businessId/home', doGetBusinessHome);