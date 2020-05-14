import { Response, Router, Request } from 'express';

import { Business, IUser } from '../models';
import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';


const router = Router({ mergeParams: true });

const doGetBusinessHome = apiWrapper.bind(
  apiWrapper, 
  'GET:/api/home/:businessId',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId);
  
    const response: APIResponse.BusinessHome = {
      data: {
        header: {
            amountRedeemed: 100,
            totalClients: 30,
            salesObjective: business.salesObjective,
            totalSales: 1000,
            depositedAmount: 20,
          },
        lastSales: {
			salesPerDay: [{
				date: new Date(),
				sales: 30
            }],
            depositedMoney: [{
                amount: 20,
                date: new Date(),
            }],
			proportionOfCards: [{
				value: 20,
                discount: 40,
                percentage: 30,
            },
            {
				value: 40,
                discount: 10,
                percentage: 30,
			}],
			lastOrders:[{
				clientName: "Maria Castro",
				clientCity: "Quito",
				voucherDiscount: 15,
				voucherAmount: 30,
				date: new Date()
			}]
		}
      }
    }

    return res.json(response);
  }
);

router.get('/:businessId', doGetBusinessHome);

export default router;