import mongoose, { Document, Schema } from 'mongoose';

import * as Constants from '../util/constants';

const NotificationSchema = new Schema({}, {
  timestamps: true
});

export interface INotification extends Document {
  type: Constants.NotificationType,
  title: string,
  description: string,
  deliveryMethod: Constants.NotificationDeliveryMethod
};

NotificationSchema.add({
  type: {
    type: Constants.NotificationType,
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  deliveryMethod: {
    type: Constants.NotificationDeliveryMethod,
    required: true,
    trim: true
  }
});

const Notification = mongoose.model<INotification>('Notification', NotificationSchema);

export default Notification;