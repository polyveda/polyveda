import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEnquiry extends Document {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  projectDetails: string;
  source: 'ContactPage' | 'FloatingWidget';
  status: 'New' | 'Contacted' | 'Closed';
  createdAt: Date;
}

const EnquirySchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    companyName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    industry: { type: String, required: true },
    projectDetails: { type: String, required: true },
    source: { type: String, enum: ['ContactPage', 'FloatingWidget'], default: 'ContactPage' },
    status: { type: String, enum: ['New', 'Contacted', 'Closed'], default: 'New' },
  },
  { timestamps: true }
);

// Prevent mongoose from recompiling the model upon hot-reloads
export const Enquiry: Model<IEnquiry> = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
