import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';

export interface IBusiness extends Document {
  name: string;
  address: string;
  country: Constants.CountryOptions;
  city: string;
  businessTelephone: string;
  businessLink: string;
  businessEmail: string;
  industry: Constants.Industries;
  businessRegisteredAt: Date;
  businessDescription: string;
  coordinates?: number[];
  avatarImageUrl: string;
  images?: string[];
  voucherOptions: Array<{
    value: Constants.VoucherOptionsValues,
    discount: Constants.PercentageDiscount,
    createdAt: Date
  }>;
  legalId: string;
  bank: Constants.BankOptions;
  accountNumer: string;
  owner: string;
  vouchers?: string[];
  transactions?: string[];
  notifications?:  string[];
}
const BusinessSchema = new Schema({}, {
  timestamps: true
});


BusinessSchema.add({
  /* Properties */
  name: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    trim: true,
    required: true
  },
  country: {
   type: Constants.CountryOptions,
   required: true,
   default: Constants.CountryOptions.ECUADOR 
  },
  city: {
    type: String,
    trim: true,
    required: true
  },
  businessTelephone: {
    type: String,
    trim: true,
    required: true
  },
  businessLink: {
    type: String,
    trim: true,
    required: true
  },
  businessEmail: {
    type: String,
    trim: true,
    required: true
  },
  industry: {
    type: Constants.Industries,
    trim: true,
    required: true
  },
  businessRegisteredAt: {
    type: Date,
    required: true
  },
  businessDescription: {
    type: String,
    trim: true,
    required: true
  },
  coordinates: {
    type: [Number], 
    default: [0, 0]
  },
  avatarImageUrl: {
    type: String,
    trim: true,
    required: true
  },
  images: {
    type: [String]
  },
  /* Voucher Options */
  voucherOptions: [{
    type: {
      value: Constants.VoucherOptionsValues, 
      discount: Constants.PercentageDiscount,
      createdAt: Date
    },
    required: true
  }],
  /* Legal Information */
  legalId: {
    type: String,
    required: true,
    trim: true
  },
  bank: {
    type: Constants.BankOptions,
    required: true
  },
  accountNumber: {
    type: String,
    trim: true,
    required: true
  },
  /* Relationships */
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vouchers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
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
});

const Business =  mongoose.model<IBusiness>('Business', BusinessSchema);
export default Business;