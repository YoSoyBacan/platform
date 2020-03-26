import mongoose, { Document, Schema } from 'mongoose';

enum RouterStatus {
  NOT_ACTIVATED = 0,
  ONLINE = 1,
  OFFLINE = 2
};

export interface IRouter extends Document {
  name: string;
  providerId: string;
  modelRef: string;
  serialNumber: string;
  firmwareVersion: string;
  networkId: string;
  status: RouterStatus;
  connectedAt: number; // epoch
  tags: mongoose.Schema.Types.ObjectId[];
}

const RouterSchema = new Schema({}, {
  timestamps: true
});

RouterSchema.add({
  name: {
    type: String,
    required: true
  },
  providerId: {
    type: String,
    required: true,
    trim: true
  },
  modelRef: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  firmwareVersion: {
    type: String,
    required: true
  },
  networkId: {
    type: String
  },
  status: {
    type: RouterStatus,
    required: true
  },
  connectedAt: {
    type: Number,
    required: true
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }]
});

export default mongoose.model<IRouter>('Router', RouterSchema);