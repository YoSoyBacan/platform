import mongoose, { Document, Schema } from 'mongoose';


export interface IOrganization extends Document {
  name: string;
  governmentId: string;
  address: string;
  city: string;
  country: string;
  legalContactName: string;
  legalConteactId: string;
  stores: mongoose.Schema.Types.ObjectId[];
};

const OrganizationSchema = new Schema({}, {
  timestamps: true
});


OrganizationSchema.add({
  name: {
    type: String,
    required: true
  },
  governmentId: {
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
  legalContactName: {
    type: String,
    required: true
  },
  legalContactId: {
    type: String,
    required: true
  },
  stores: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }]
});


export default mongoose.model<IOrganization>('Organization', OrganizationSchema);