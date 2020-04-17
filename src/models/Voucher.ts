import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';
import { IOrder } from './Order';

export interface IVoucher extends Document {
    discount: Constants.PercentageDiscount;
    amount: Constants.VoucherOptionsValues;
    totally_redeemed: boolean;
    order: (string | IOrder), 
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
    amount: {
        type: Constants.VoucherOptionsValues,
        required: true
    },
    totally_redeemed: {
        type: Boolean,
        required: true
    },
    /* Relationship */
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