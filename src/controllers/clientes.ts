import { Response, Router, Request } from 'express';
import { Business, IUser } from '../models';
import { Voucher, User } from '../models';

import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';
import { IVoucher } from '../models/Voucher';
import router from './user';

const doGetClients = apiWrapper.bind(
  apiWrapper,
  'GET:/api/:businessId/clientes', 
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("vouchers");
    const getAllClientIds = business.vouchers.map((voucher:IVoucher) => {
      return voucher.userId as string
    }) 
    const uniqueClientIds = [ ...new Set(getAllClientIds)];
    const users = await Promise.all(uniqueClientIds.map(id => (
      User.findById(id)
    )));

    const get_user_list = users.map((user:IUser) => ({
          user_firstName: user.firstName,
          user_lastName: user.lastName,
          user_email: user.email,
          user_city: user.city,
          user_country: user.country
      }));


    
    const response: APIResponse.ClientesResponse = {
      data: {
        total_users: users.length,
        user_list: get_user_list,
      }
    };

    return res.json(response);
  }
);

router.get('/:businessId/clientes', doGetClients);
export default router;