import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';


export interface IBusiness extends Document {
  name: string;
  address: string;
  country: Constants.CountryOptions,
  city: string,
  telephone: string,
  publicLink: string,
  businessEmail: string,
  industry: Constants.Industries,
  businessRegisteredAt: Date,
  businessDescription: string,

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
  telephone: {
    type: String,
    trim: true,
    required: true
  },
  publicLink: {
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
  percentageDiscount: {
    type: Constants.PercentageDiscount,
    required: true
  },
  coordinates: {
    type: [Number], 
    default: [0, 0]
  },
  avatarImageUrl: {
    type: String,
    required: true,
    trim: true
  },
  images: {
    type: [String],
    required: true
  },
  /* Voucher Options */
  voucherOptions: {
    type: [Constants.VoucherOptionsValues],
    required: true
  },
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
    required: true,
    trim: true
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