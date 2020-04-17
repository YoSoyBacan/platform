import { Response, Router, Request } from 'express';
import { Business, IUser } from '../models';
import { Voucher, Account } from '../models';

import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';
import { IAccount } from '../models/Account';
import { IVoucher } from '../models/Voucher';
import router from './user';

const doGetClients = apiWrapper.bind(
  apiWrapper,
  'GET:/api/:businessId/clientes', 
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("vouchers");
    const getAllAccountsIds = business.vouchers.map((voucher:IVoucher) => {
      return voucher.account as string
    }) 
    const uniqueAccountIds = [ ...new Set(getAllAccountsIds)];
    const accounts = await Promise.all(uniqueAccountIds.map(id => (
      Account.findById(id).populate("user")
    )));

    const get_user_list = accounts.map((account:IAccount) => ({
          user_firstName: (account.user as IUser).firstName,
          user_lastName: (account.user as IUser).lastName,
          user_email: (account.user as IUser).email,
          user_city: account.city,
          user_country: account.country
      }));


    
    const response: APIResponse.ClientesResponse = {
      data: {
        total_users: accounts.length,
        user_list: get_user_list,
      }
    };

    return res.json(response);
  }
);

router.get('/:businessId/clientes', doGetClients);
