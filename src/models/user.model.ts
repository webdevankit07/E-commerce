import { model, Model, models, Schema, Document, ObjectId } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

type AddressType = {
    city: string;
    state: string;
    country: string;
    postalCode: string;
    _id: ObjectId;
};

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
    address: AddressType[];
    wishlist: ObjectId[];
    refreshToken: string;
    passwordChangedAt: Date;
    passwordResetToken: string;
    passwordResetExpires: Date;
    isPasswordCorrect: (value: string) => Promise<boolean>;
    genaratetAccessToken: () => string;
    genaratetRefreshToken: () => string;
    genaratetPasswordResetToken: () => Promise<string>;
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
        address: [{ city: String, state: String, country: String, postalCode: String }],
        wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
        refreshToken: { type: String },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
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

UserSchema.methods.genaratetPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 1000 * 60 * 10;
    return resetToken;
};

const User = (models.User as Model<UserSchemaType>) || model<UserSchemaType>('User', UserSchema);
export default User;
