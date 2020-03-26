import moment from 'moment';
import mongoose, { Document, Schema } from 'mongoose';

enum StatusEsl {
  NOT_ACTIVATED = 0,
  NOT_BINDED = 1,
  WAITING_FOR_DATA = 2,
  PUSH_SUCCESS = 3,
  PUSH_FAILED = 4
};

enum ModelEnum {
  BL202 = "BL202",
  BL201 = "BL201",
  BLA01 = "BLA01"
};

export enum ModelName {
  SL121 = "SL121",
  SL126 = "SL126",
  SL142 = "SL142"
};

enum ScreenSizeInches {
  FOUR_INCHES = 4.2,
  TWO_ONE = 2.1,
  TWO_SIX = 2.6
};

export enum SignalStatus {
  WEAK = "Baja",
  GOOD = "Buena",
  EXCELLENT = "Excelente"
};

export interface ITag extends Document {
  _id: string;
  providerId: string;
  product: mongoose.Schema.Types.ObjectId;
  template: mongoose.Schema.Types.ObjectId;
  router: mongoose.Schema.Types.ObjectId;
  store: mongoose.Schema.Types.ObjectId;
  updateStatus: StatusEsl;
  modelType: ModelEnum;
  modelRef: ModelName;
  screenSize: ScreenSizeInches
  esl_sn: string;
  software_version: string;
  battery: number;
  signal: SignalStatus;
  lastUpdated: number /* epoch of last rendered */
  lastUpdatedString?: string;
  lastUpdatedRelative?: string;
};

const TagSchema = new Schema({}, {
  timestamps: true
});

TagSchema.add({
  providerId: {
    type: String,
    required: true,
    trim: true
  },
  /** Relationships */
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  template: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Template',
    required: true
  },
  router: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Router',
    required: true
  },
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true
  },
  updateStatus: {
    type: StatusEsl,
    required: true
  },
  modelType: {
    type: ModelEnum,
    required: true
  },
  modelRef: {
    type: ModelName,
    required: true
  },
  screenSize: {
    type: ScreenSizeInches,
    required: true
  },
  esl_sn: {
    type: String,
    required: true
  },
  software_version: {
    type: String,
    required: true
  },
  battery: {
    type: Number,
  },
  signal: {
    type: Number
  },
  lastUpdated: {
    type: Number,
    required: true
  }
});

/**
 * Virtuals
 */

TagSchema.virtual('lastUpdatedString', function() {
  return moment(this.lastUpdated).format('ll');
});

TagSchema.virtual('lastUpdatedRelative', function() {
  return moment(this.lastUpdated, 'YYYYMMDD').fromNow();
});


export default mongoose.model<ITag>('Tag', TagSchema);