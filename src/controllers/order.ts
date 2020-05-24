import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
import * as Constants from '../util/constants';
import { Order, Business, Voucher } from "../models";
import { apiWrapper, RequestFailure, ResponseCode } from './common';
import { Response, Router, Request } from 'express';
import BuenPlanAPI from '../lib/clients/buenplan';
import { CreateOrderValidator } from '../validators/order';
import { APIResponse } from '../lib/responseTypes';

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

interface CreateOrderSchema extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        paymentMethod: Constants.PaymentMethod;
        status: Constants.OrderStatus;
        currency: Constants.Currency;
        token: string;
        checkoutId: string;
        userId: string;
        vouchersInOrder: Array<APIResponse.vouchersInOrder>;
        notification?: string;
        buenPlanBody: Array<{
            businessId: string;
            amount: number;
        }>;
    }
}


const doCreateOrder = apiWrapper.bind(
    apiWrapper,
    "POST:/api/order",
    async (req: ValidatedRequest<CreateOrderSchema>, res: Response) => {
        const foundOrder = await Order.findOne({
            checkoutId: req.body.checkoutId
        })
        if (foundOrder) {
            const err: RequestFailure = {
                code: ResponseCode.ERROR_FORBIDDEN,
                error: true,
                referenceId: res.locals.sequenceId,
                message: `Esta orden ya fue procesada. Gracias por tu compra!`,
              };
              return res.status(400).json(err);
        } 
        
        let orderId = "";
        let newOrder: any;

        if (req.body.status === Constants.OrderStatus.REJECTED || req.body.status === Constants.OrderStatus.ERROR) {
            
            // CREATE ORDER
            newOrder = new Order({
                paymentMethod: req.body,
                status: req.body.status,
                currency: req.body.currency,
                token: req.body.token, 
                checkoutId: req.body.checkoutId,
                transactionProviderId: "Orden Rechazada",
                accoutId: req.body.userId,
                notification: req.body.notification
            });

            orderId = newOrder._id;
            
        } else if (req.body.status === Constants.OrderStatus.PAID) {
            

            /* SEND ORDER TO BUEN PLAN */
            const { data } = await BuenPlanAPI.post<{id: string}>('transactions', {
                paymentCode: req.body.token, 
                details: req.body.buenPlanBody
            });

             // CREATE ORDER
            newOrder = new Order({
                paymentMethod: req.body.paymentMethod,
                status: req.body.status,
                currency: req.body.currency,
                token: req.body.token, 
                checkoutId: req.body.checkoutId,
                transactionProviderId: data.id,
                userId: req.body.userId,
                notification: req.body.notification
            });

            orderId = newOrder._id;

        } else {
            return res.status(400);
        }
                
        // CREATE VOUCHER
        req.body.vouchersInOrder.forEach(async (voucher) => {
            const newVoucher =  new Voucher({
                discount: voucher.discount,
                amountPaid: voucher.amountPaid, 
                amountToRedeem: voucher.amountToRedeem,
                totallyRedeemed: false, 
                order: orderId,
                business: voucher.businessId,
                userId: req.body.userId
            });

            try {
                const voucherId = newVoucher._id;
            
                //ADD THE VOUCHER ID to the ORDER
                newOrder.vouchersInOrder.push(voucherId);

                //ADD THE ORDER AND EACH VOUCHER TO THE BUSINESS
                const foundBusiness = await Business.findById(voucher.businessId);
                foundBusiness.vouchers.push(voucherId);

                await foundBusiness.save();
                await newVoucher.save();
            } catch (error) {
                return res.status(400)
            }
        });

        await newOrder.save();

        return res.status(200).json(newOrder);
    }
);

const doGetOrder = apiWrapper.bind(
    apiWrapper, 
    "GET:/api/order/:orderId",
    async (req: Request, res: Response) => {
        const order = await Order.findById(req.params.orderId);

        const response: APIResponse.OrderInformationResponse = {
            data: {
                status: order.status,
                currency: order.currency,
                checkoutId: order.checkoutId,
                transactionProviderId: order.transactionProviderId,
                userId: order.userId,
                vouchersInOrder: order.vouchersInOrder,
                notification: order.notification
            }
        }

        return res.json(response);
    }
);

router.get('/:orderId', doGetOrder);
router.post('/', validator.body(CreateOrderValidator), doCreateOrder);
export  default router;