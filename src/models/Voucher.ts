import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';
import { ContainerTypes } from 'express-joi-validation';

export interface IVoucher extends Document {
    discoutn: Constants.PercentageDiscount;
    voucherOption: string;
    order: string, 
    transactions?: string[];
    account: string;
    business: string;
    notification?: string[]; 
}

const VoucherSchema = new Schema({}, {
    timestamps: true
});

VoucherSchema.add({
    discount: {
        type: Constants.PercentageDiscount,
        required: true
    },
    /* Relationship */
    voucherOption: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VoucherOption',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
        required: true
    },
    transactions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: false
    }], 
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
    notification: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification', 
        required: false
    }]
})

const Voucher = mongoose.model<IVoucher>('Voucher', VoucherSchema);
export default Voucher;