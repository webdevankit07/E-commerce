import { Model, model, models, Schema, Document } from 'mongoose';

interface EnqSchemaType extends Document {
    name: string;
    email: string;
    mobile: string;
    comment: string;
    status: 'Submitted' | 'Contacted' | 'In Progress' | 'Resolved';
}

const EnqSchema: Schema<EnqSchemaType> = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        comment: { type: String, required: true },
        status: { type: String, default: 'Submitted', enum: ['Submitted', 'Contacted', 'In Progress', 'Resolved'] },
    },
    { timestamps: true }
);

const Enquiry = (models.Enquiry as Model<EnqSchemaType>) || model<EnqSchemaType>('Enquiry', EnqSchema);
export default Enquiry;
