import Product from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const products = await Product.find();
        return NextResponse.json({ products, message: 'All products', success: true }, { status: 200 });
    } catch (error: any) {
        console.log('Error while fetching all products', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
