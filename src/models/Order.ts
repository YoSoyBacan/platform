import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';

const OrderSchema = new Schema({}, {
  timestamps: true
});

export interface IOrder extends Document {
  paymentMethod: Constants.PaymentMethod
  status: Constants.OrderStatus;
  currency: Constants.Currency;
  token: string;
  /* Relationships */
  account: string;
  business: string;
  vouchers: string[]
  notification: string;
};

OrderSchema.add({
  /* Properties */
  paymentMethod: {
    type: Constants.PaymentMethod,
    required: true
  },
  status: {
    type: Constants.OrderStatus,
    required: true,
    default: Constants.OrderStatus.PENDING
  },
  currency: {
    type: Constants.Currency,
    required: true
  },
  token: {
    type: String,
    required: false,
    trim: true
  },
  /* Relationships */
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account', 
    required: true
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business', 
    required: true
  },
  vouchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
    required: false
  }],
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: false
  }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;