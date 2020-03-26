// - Has a Template
// - Has a list of Tags
import Big from 'big.js';
import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';




export interface IProduct extends Document {
  _id: string;
  name: string;
  brand: string;
  supplierName: string;
  dateReceived: number;
  expiryDate: number;
  invoiceNumber: string;
  subtotal: number;
  subtotalDiscount: number; // 0 - 1. Discount rate applied to this product
  subtotalMember: number;
  taxRate: number;
  cost: number;
  unit: Constants.UnitEnum;
  quantity: number;
  barcode: string;
  category: string // TODO: This needs to be a model on its own.
  area?: string;
  rackNumber?: number;
  qrCodeUrl?: string;
  imageUrl?: string;
};

const ProductSchema = new Schema({}, {
  timestamps: true
});

ProductSchema.add({
  name: {
    type: String,
    trim: true,
    required: true
  },
  brand: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    trim: true,
    required: true
  },
  supplier: {
    type: String,
    trim: true,
    required: true
  },
  dateReceived: {
    type: Number,
    default: Date.now()
  },
  expiryDate: {
    type: Number,
  },
  invoiceNumber: {
    type: String
  },
  category: {
    type: String,
    trim: true,
    required: true
  },
  subtotal: {
    type: Number,
    required: true
  },
  subtotalDiscount: {
    type: Number
  },
  subtotalMember: {
    type: Number,
    required: true
  },
  taxRate: {
    type: Number,
    default: Constants.ECUADOR_TAX_RATE
  },
  cost: {
    type: Number
  },
  unit: {
    type: Constants.UnitEnum,
    default: Constants.UnitEnum.UNIDAD,
    required: true
  },
  quantity: {
    type: Number
  },
  barcode: {
    type: String
  },
  aisle: {
    type: String
  },
  rackNumber: {
    type: Number
  },
  qrCodeUrl: {
    type: String
  },
  imageUrl: {
    type: String
  }
});

/**
 * Virtuals
 */

ProductSchema.virtual('price').get(function() {
  const totalPrice = Big(this.subtotal).times(
    Big(this.taxRate + 1)
  ).toString()
  return Number(totalPrice);
});

ProductSchema.virtual('discountPrice').get(function() {
  if (!this.subtotalDiscount) {
    return 0;
  }
  const discountPrice = Big(this.subtotalDiscount).times(
    Big(this.taxRate + 1)
  ).toString()
  return Number(discountPrice);
});

ProductSchema.virtual('memberPrice').get(function() {
  if (!this.memberPrice) {
    return 0;
  }
  const memberPrice = Big(this.subtotalMember).times(
    Big(this.taxRate + 1)
  ).toString()
  return Number(memberPrice);
});




export default mongoose.model<IProduct>('Product', ProductSchema);