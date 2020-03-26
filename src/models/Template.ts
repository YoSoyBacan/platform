import mongoose, { Document, Schema } from 'mongoose';

const TemplateSchema = new Schema({}, {
  timestamps: true
});

export enum TemplateScreen {
  TWO_THIRTHEEN_INCH = 1,
  TWO_SIX_INCH = 2,
  FOUR_TWO_INCH = 3
}
export enum TemplateColor {
  BLACK_WHITE = 1,
  BLACK_WHITE_RED = 2
};
export interface ITemplate extends Document {
  _id: string;
  name: string;
  providerId: string;
  providerName: string;
  templateScreen: TemplateScreen;
  templateColor: TemplateColor;
  products: mongoose.Schema.Types.ObjectId[]; // List of products that use this template
  tags: mongoose.Schema.Types.ObjectId[]; // List of tags that have this template
  store: mongoose.Schema.Types.ObjectId;
};

TemplateSchema.add({
  name: {
    type: String,
    required: true
  },
  providerId: {
    type: String,
    required: true,
    trim: true
  },
  providerName: {
    type: String,
    required: true,
    trim: true
  },
  templateScreen: {
    type: TemplateScreen,
    required: true
  },
  templateColor: {
    type: TemplateColor,
    required: true
  },
  /* Relationships */
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  tags:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});


export const Template =  mongoose.model<ITemplate>('Template', TemplateSchema);