import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';

const UserSchema = new Schema({}, {
  timestamps: true
});

export interface IUser extends Document {
  type: Constants.UserType;
  email: string;
  phoneNumber: string;
  countryCode: string;
  authMethod: Constants.AuthMethods
};

UserSchema.add({
  /* Properties */
  type: {
    type:Constants.UserType,
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  countryCode: {
    type: String,
    required: true,
    trim: true,
  },
  authMethod: {
    type: Constants.AuthMethods,
    required: true,
    default: Constants.AuthMethods.EMAIL
  },
  /* TODO: Add any FB, GOOGL related information here for sign-in */
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;