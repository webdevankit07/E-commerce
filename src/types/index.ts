import { IconType } from 'react-icons/lib';
//! ********************  ProductTypes -- START ********************* //
export type ColorType = {
    _id: string;
    name: string;
    colorCode: string;
};
export type RatingType = {
    _id: string;
    star: number;
    comment: string;
    postedby: {
        _id: string;
        firstname: string;
        lastname: string;
        username: string;
        role: string;
    };
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
    colors: string[];
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
    wishlist: WishList | [];
    compare: ProductType[] | [];
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
export type WishList = ProductType[];
export type WishListResType = {
    user: UserResType;
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
    clientProducts: ProductResType | null;
    isError: boolean;
    isLoading: boolean;
    isProductEditing: boolean;
    isProductDeleting: boolean;
    isSuccess: boolean;
    message: string | unknown;
};

export type CreateProductData = {
    title: string;
    description: string;
    price: number;
    quantity: number;
    images: File[];
    category: string;
    brand: string;
    colors: string[];
};

export type CreateProductInfo = {
    title: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    brand: string;
    colors: string[];
};

export type CreateProductResType = {
    product: ProductType;
    success: boolean;
    message: string;
};
export type UpdateProductData = {
    title: string;
    description: string;
    price: number;
    quantity: number;
    images: File[];
    category: string;
    brand: string;
    colors: string[];
};
export type UpdateProductInfo = {
    _id: string;
    title: string;
    description: string;
    price: number;
    quantity: number;
    category: string;
    brand: string;
    colors: string[];
    images: ImageType[];
};
export type UpdateProductResType = CreateProductResType;

export type DeleteProductResType = {
    productId: string;
    success: boolean;
    message: string;
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
    createLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};
export type CreateBrandResType = {
    newBrand: BrandType;
    message: string;
    success: boolean;
};
export type DeleteBrandResType = {
    brand: BrandType;
    message: string;
    success: boolean;
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
    createLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};
export type CreateColorResType = {
    newColor: ColorType;
    message: string;
    success: boolean;
};
export type DeleteColorResType = {
    color: ColorType;
    message: string;
    success: boolean;
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
    createLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};
export type CreateCategoryResType = {
    newCategory: ProductCategoryType;
    message: string;
    success: boolean;
};
export type DeleteCategoryResType = {
    deletedcategory: ProductCategoryType;
    message: string;
};
//!
//!
//!
//! ********************  CouponSlice ********************* //
export type CouponType = {
    _id: string;
    name: string;
    expiry: Date;
    discount: number;
};
export type CreateCouponDataType = {
    name: string;
    expiry: Date;
    discount: number;
};
export type UpdateCouponDataType = CouponType;
export type CouponResType = {
    coupons: CouponType[];
};
export type UpdateCouponResType = {
    coupon: CouponType;
};
export type CouponSliceInitialStateType = {
    coupons: CouponType[] | [];
    isError: boolean;
    isLoading: boolean;
    createLoading: boolean;
    isSuccess: boolean;
    message: string | unknown;
};
export type CreateCouponResType = {
    coupon: CouponType;
    message: string;
    success: boolean;
};
export type DeleteCouponResType = {
    coupon: CouponType;
    message: string;
    success: boolean;
};

//!
//!
//!
//! ********************  enqSlice ********************* //
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
export type UpdateEnqType = {
    enquiry: EnquiryType;
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
export type updateOrderResType = {
    order: OrderType;
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

//!
//!
//!
//! ********************  EnquirySlice ********************* //
export type DeleteEnquiryType = {
    enquiry: {
        name: string;
        email: string;
        mobile: string;
        comment: string;
        status: string;
        _id: string;
    };
    message: 'success';
    success: true;
};
//!
//!
//!
//! ********************  RatingTYpe ********************* //
export type GiveratingResType = {
    product: ProductType;
    message: 'success';
    success: true;
};
