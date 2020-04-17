import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';
import { IVoucher } from './Voucher';
import { IUser } from './User';

export interface IBusiness extends Document {
  businessPersonName: string;
  businessPersonId: string;
  businessCountry: Constants.CountryOptions;
  businessEmail: string;
  /* Business */
  legalName: string;
  businessLegalId: string;
  numEmployees: number;
  businessAddress: string;
  businessCity: string;
  entityType: Constants.EntityType;
  hasAccounting: boolean;
  businessPhone: string;
  businessLink: string;
  /* Extra */
  industry?: Constants.Industries;
  businessRegisteredAt?: Date;
  businessDescription?: string;
  coordinates?: number[];
  avatarImageUrl?: string;
  images?: string[];
  voucherOptions?: Array<{ 
    value: Constants.VoucherOptionsValues, 
    discount: Constants.PercentageDiscount, 
    createdAt: Date}>;
  /* Bank Info*/
  bankName: Constants.BankOptions;
  bankAccountNumber: string;
  bankAccountType: Constants.BankAccountType;
  bankBeneficiaryName: string;
  /* Relationships */
  owner: string | IUser;
  vouchers?: (string | IVoucher)[];
  transactions?: string[];
  notifications?:  string[];
}
const BusinessSchema = new Schema({}, {
  timestamps: true
});


BusinessSchema.add({
  /* Properties */
  businessPersonName: {
    type: String,
    trim: true,
    required: true
  },
  businessPersonId: {
    type: String,
    trim: true,
    required: true
  },
  businessCountry: {
    type: Constants.CountryOptions,
    required: true,
    default: Constants.CountryOptions.ECUADOR 
   },
  businessEmail: {
    type: String,
    trim: true,
    required: true
  },
  /* Business */
  legalName: {
    type: String, 
    trim: true,
    required: true
  },
  businessLegalId: {
    type: String,
    required: true,
    trim: true
  },
  businessAddress: {
    type: String,
    trim: true,
    required: true
  },
  businessCity: {
    type: String,
    trim: true,
    required: true
  },
  entityType: {
    type: Constants.EntityType,
    required: true
  },
  hasAccounting: {
    type: Boolean, 
    trim: true, 
    required: true
  }, 
  businessPhone: {
    type: String,
    trim: true,
    required: true
  },
  businessLink: {
    type: String,
    trim: true,
    required: true
  },
  /* Extra */
  industry: {
    type: Constants.Industries,
  },
  businessRegisteredAt: {
    type: Date,
  },
  businessDescription: {
    type: String,
    trim: true
  },
  coordinates: {
    type: [Number], 
    default: [0, 0]
  },
  avatarImageUrl: {
    type: String,
    trim: true
  },
  images: {
    type: [String]
  },
  voucherOptions: [{
    type: mongoose.Schema.Types.Mixed
  }],
  /* Bank Info */
  bankName: {
    type: Constants.BankOptions,
    required: true
  },
  bankAccountNumber: {
    type: String,
    trim: true,
    required: true
  },
  bankAccountType: {
    type: Constants.BankAccountType, 
    required: true
  },
  bankBeneficiaryName: {
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