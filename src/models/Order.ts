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
  checkoutId: string;
  transactionProviderId: string;
  /* Relationships */
  accountId: string;
  vouchersInOrder?: string[];
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
    required: true,
    trim: true
  },
  checkoutId: {
    type: String, 
    required: true
  },
  transactionProviderId: {
    type: String, 
    required: true
  },
  /* Relationships */
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account', 
    required: true
  },
  vouchersInOrder: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VouchersInOrder'
  }],
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: false
  }
});

const Order = mongoose.model<IOrder>('Order', OrderSchema);
export default Order;