import mongoose, { Document, Schema } from 'mongoose';
import { constants } from 'buffer';

import * as Constants from '../util/constants';

export interface IRedeemTransaction extends Document {
    amount: number;
    voucher: string;
    business: string;
    userId: string;
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
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
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