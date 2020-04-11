import mongoose, { Document,  Schema } from 'mongoose';

import * as Constants from '../util/constants';

const AccountSchema = new Schema({}, {
  timestamps: true
});

export interface IAccount extends Document {
  address?: string;
  city?: string;
  country: string;
  legalID?: string;
  user: string;
  vouchers?: string[];
  orders?: string[];
  transactions?: string[];
  notifications?: string[];
}

AccountSchema.add({
  /*Properties*/
  address: {
    type: String,
    trim: true
  }, 
  city: {
    type: String,
    trim: true
  }, 
  country: {
    type: Constants.CountryOptions,
    required: true,
    default: Constants.CountryOptions.ECUADOR 
  }, 
  /* Legal Information */
  legalID: {
    type: String,
    trim: true
  },
  /* Relationships */ 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  vouchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
    required: false
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: false
  }],
  transactions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Transaction', 
    required: false
  }],
  notifications: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: false
  }]
})

const Account = mongoose.model<IAccount>('Account', AccountSchema);
export default Account; 