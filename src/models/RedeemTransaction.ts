import mongoose, { Document, Schema } from 'mongoose';
import { constants } from 'buffer';

import * as Constants from '../util/constants';

export interface IRedeemTransaction extends Document {
    amount: number;
    business: string;
    voucher: string;
    account: string;
    notification: string;
}

const RedeemTransactionSchema = new Schema({}, {
    timestamps: true
});

RedeemTransactionSchema.add({
    /* Properties */
    amount: {
        type: Number, //or Decimal128? 
        required: true
    },
    /* Relationships */
    voucher: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Voucher',
        required: true
    }, 
    business: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Business',
        required: true
    },
    account: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Account', 
        required: true
    },
    notification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notification',
        required: true
    }
})

const RedeemTransaction = mongoose.model<IRedeemTransaction>('RedeemTransaction', RedeemTransactionSchema);
export default RedeemTransaction;