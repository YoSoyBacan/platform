import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';

const UserSchema = new Schema({}, {
  timestamps: true
});

export interface IUser extends Document {
  type: Constants.UserType;
  firstName: string;
  lastName: string;
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
  firstName: {
    type: String, 
    trime: true, 
    required: true
  },
  lastName: {
    type: String, 
    trime: true, 
    required: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true
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