import { model, Model, models, Schema, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface UserSchemaType extends Document {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    role: string;
    isBlocked: boolean;
    cart: unknown[];
    address: ObjectId[];
    wishlist: ObjectId[];
    refreshToken: string;
    isPasswordCorrect: (value: string) => Promise<boolean>;
    genaratetAccessToken: () => string;
    genaratetRefreshToken: () => string;
}

const UserSchema: Schema<UserSchemaType> = new Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        mobile: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true, default: 'user' },
        isBlocked: { type: Boolean, default: false },
        cart: { type: Array, default: [] },
        address: [{ type: Schema.Types.ObjectId, ref: 'Address' }],
        wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        refreshToken: { type: String },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

UserSchema.methods.isPasswordCorrect = function (password: string) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.genaratetAccessToken = function () {
    const cookieData = { _id: this._id, email: this.email, username: this.username };
    const secretKey = process.env.ACCESS_TOKEN_SECRET as string;
    return jwt.sign(cookieData, secretKey, { expiresIn: '1d' });
};

UserSchema.methods.genaratetRefreshToken = function () {
    const cookieData = { _id: this._id, email: this.email, username: this.username };
    const secretKey = process.env.REFRESH_TOKEN_SECRET as string;
    return jwt.sign(cookieData, secretKey, { expiresIn: '10d' });
};

const User = (models.User as Model<UserSchemaType>) || model<UserSchemaType>('User', UserSchema);
export default User;
