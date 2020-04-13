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
    const user = (business.owner as any) as IUser;
  
    const response: APIResponse.BusinessResponse = {
      data: {
        business_information: {
          name: business.name, 
          adress: business.address,
          registered_date: business.businessRegisteredAt,
          phone_number: business.businessTelephone,
          city: business.city,
          country: business.country,
          email: business.businessEmail,
          industry: business.industry,
          link: business.businessLink,
          avatar: business.avatarImageUrl, 
          images: business.images,
          legalId: business.legalId,
          bank: business.bank,
          account_number: business.accountNumber,
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

router.get('/:businessId', doGetBusinessHome);