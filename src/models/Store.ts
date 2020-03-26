import mongoose, { Document, Schema } from 'mongoose';


export interface IStore extends Document {
  name: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  sqMeters: number;
  organization: mongoose.Schema.Types.ObjectId;
  products: mongoose.Schema.Types.ObjectId[];
  tags: mongoose.Schema.Types.ObjectId[];
  routers: mongoose.Schema.Types.ObjectId[];
  templates: mongoose.Schema.Types.ObjectId[];
};

const StoreSchema = new Schema({}, {
  timestamps: true
});

StoreSchema.add({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  sqMeters: {
    type: Number,
    required: true
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  routers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Router'
  }],
  templates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template'
  }]
});

export default mongoose.model<IStore>('Store', StoreSchema);