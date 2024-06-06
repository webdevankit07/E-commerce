import { Document, model, Model, models, Schema } from 'mongoose';

interface ColorSchemaType extends Document {
    name: string;
}

const ColorSchema: Schema<ColorSchemaType> = new Schema(
    { name: { type: String, required: true, unique: true, index: true } },
    { timestamps: true }
);

const Color = (models.Color as Model<ColorSchemaType>) || model<ColorSchemaType>('Color', ColorSchema);
export default Color;
