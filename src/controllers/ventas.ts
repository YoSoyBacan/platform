import { Response, Router, Request } from 'express';
import { Business } from '../models';
import { apiWrapper } from './common';
import { APIResponse } from '../lib/responseTypes';
import { IVoucher } from '../models/Voucher';

const router = Router({ mergeParams: true });

const doGetVouchers =  apiWrapper.bind(
  apiWrapper, 
  'GET:/api/:businessId/ventas',
  async (req: Request, res: Response) => {
    const business = await Business.findById(req.params.businessId).populate("vouchers");
    
    // const getAllOrderIds = business.vouchers.map((voucher:IVoucher) => {
    //   return voucher.order as string
    // })
    // const orderIds = [ ...new Set(getAllOrderIds)];
    // const orders = await Promise.all(orderIds.map(id => (
    //   Order.findById(id)
    // )));

    // const deposited_amount = orders.reduce((deposited_amount, order) => {
    //   if(order.status === 'Pagada'){
    //     order.vouchers
    //     retirn deposited_amount + order.
    //   } 
    //   return deposited_amount
    // }, 0)

    // const totalDepositedAmount = 134;

    const totalNumberOfVouchers = (business.vouchers).length;
    const redeemedVouchers = (business.vouchers).filter((voucher:IVoucher) => {
      return (voucher.totallyRedeemed === true);
    });
    const totalRedeemedVouchers = redeemedVouchers.length;
    const totalAmountOfVouchers = (business.vouchers).reduce((prev, voucher:IVoucher) => {
      return voucher.amountPaid + prev
    }, 0);
  
    const allVouchers = business.vouchers.map((voucher:IVoucher) => ({  
        voucher_discount: voucher.discount,
        voucher_amount_to_redeem: voucher.amountToRedeem,
        voucher_amount_paid: voucher.amountPaid,
        totally_redeemed: voucher.totallyRedeemed,
        voucher_order_id: voucher.order as string,
      }));
    
    const response: APIResponse.VentasResponse = {
      data: {
        //deposited_amount: totalDepositedAmount TODO,
        total_number_of_vouchers_sold: totalNumberOfVouchers,
        total_redeemed_vouchers: totalRedeemedVouchers, 
        total_amount_sold: totalAmountOfVouchers,
        voucher_list: allVouchers
      }
    };

    return res.json(response);
  }
);


router.get('/:businessId/ventas', doGetVouchers)