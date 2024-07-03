import { IconType } from 'react-icons/lib';
//! ********************  ProductTypes -- START ********************* //
export type ColorType = {
    _id: string;
    name: string;
};
export type RatingType = {
    _id: string;
    star: number;
    comment: string;
    postedby: UserResType;
};
export type ImageType = { public_id: string; url: string; optimizeUrl: string };

export type ProductType = {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: string;
    brand: string;
    quantity: number;
    sold: number;
    colors: ColorType[];
    color: ColorType[];
    images: ImageType[];
    ratings: RatingType[];
    totalRating: number;
};

export type ProductResType = {
    products: ProductType[];
    pageNo: number;
    itemRange: string;
    nbHits: number;
    totalProducts: number;
};
//! ********************  ProductTypest Types -- END********************* //

export type ServiceType = {
    Icon: IconType;
    title: string;
    subtitle: string;
};

export type CategoryType = {
    title: string;
    details: string;
    location: string;
    imgUrl: string;
};

export type ApiResposeType = {
    message: string;
    success: boolean;
};

//!
//!
//!
//! ********************  SignUp Component Types ********************* //
export type SignUpFormData = {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
    password: string;
    confirmPassword: string;
};

//!
//!
//!
//! ********************  AuthSlice ********************* //
export type UserResType = {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
    role: 'user' | 'admin';
};

export type AuthInitialStateType = {
    user: UserResType | null;
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

export type LoginData = {
    identifier: string;
    password: string;
};

export type LoginResType = {
    user: UserResType;
    message: string;
    success: boolean;
};

export type SignUpResType = {
    user: UserResType;
    message: string;
    success: boolean;
};

//!
//!
//!
//! ********************  CustomerSlice ********************* //
export type CustomerInitialStateType = {
    customers: UserResType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  ProductSlice ********************* //
export type ProductSliceInitialStateType = {
    products: ProductType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  BrandSlice ********************* //
export type BrandType = {
    _id: string;
    name: string;
};
export type BrandResType = {
    brands: BrandType[];
};
export type BrandInitialStateType = {
    brands: BrandType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  ColorSlice ********************* //
export type ColorResType = {
    colors: ColorType[];
};
export type ColorInitialStateType = {
    colors: ColorType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  CategorySlice ********************* //
export type ProductCategoryType = {
    _id: string;
    title: string;
};
export type ProductCategoryResType = {
    categories: ProductCategoryType[];
};
export type CategoryInitialStateType = {
    categories: ProductCategoryType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  CategorySlice ********************* //
export type EnquiryType = {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    comment: string;
    status: string;
    createdAt: Date;
};
export type EnquiryResType = {
    enquiries: EnquiryType[];
};
export type EnquiryInitialStateType = {
    enquiries: EnquiryType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

//!
//!
//!
//! ********************  OrderSlice ********************* //
export type OrderProductType = {
    _id: string;
    product: {
        _id: string;
        title: string;
        price: number;
        images: ImageType[];
    };
    count: number;
    color: string;
};
export type PaymentIntentType = {
    id: string;
    method: string;
    amount: number;
    status: string;
    created: number;
    currency: string;
};
export type OrderUserType = {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    mobile: string;
    role: string;
};
export type OrderType = {
    _id: string;
    products: OrderProductType[];
    paymentIntent: PaymentIntentType;
    orderStatus: string;
    orderby: OrderUserType;
    createdAt: Date;
};
export type OrderResType = {
    orders: OrderType[];
    message: string;
    success: boolean;
};
export type OderInitialStateType = {
    orders: OrderType[] | [];
    isError: boolean;
    isLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};
