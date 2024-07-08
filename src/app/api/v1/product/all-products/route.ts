import { ConnectDB } from '@/config/connectDB';
import Product from '@/models/product.model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
    await ConnectDB();

    try {
        const searchParams = req.nextUrl.searchParams;

        //! ......... Query params ............ //
        const search = searchParams.get('search');
        const title = searchParams.get('title');
        const brand = searchParams.get('brand');
        const category = searchParams.get('category');
        const price = searchParams.get('price');
        const minPrice = searchParams.get('minPrice');
        const sort = searchParams.get('sort');
        const select = searchParams.get('select');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');

        //! ......... Data QueryObject ............ //
        let queryObject: any = {};
        let productData;
        search && (queryObject.title = { $regex: search, $options: 'i' });
        title && (queryObject.title = { $regex: title, $options: 'i' });
        brand && (queryObject.brand = { $regex: brand, $options: 'i' });
        category && (queryObject.category = { $regex: category, $options: 'i' });
        price && (queryObject.price = { $lte: price });
        minPrice && (queryObject.price = { $gte: minPrice });

        productData = Product.find(queryObject).select('-__v');

        //! ......... Sorting ............ //
        if (sort) {
            let sortFix = sort.split(',').join(' ');
            productData = productData.sort(sortFix);
        }

        //! ....... filtering ....... //
        if (select) {
            let selectFix = select.split(',').join(' ');
            productData = productData.select(selectFix);
        }
        //! ....... Pagination ....... //
        let pageNo = (page && +page) || 1;
        let Limit = (limit && +limit) || 0;
        let skip = (pageNo - 1) * Limit;

        const totalProducts = await Product.countDocuments();
        if (skip >= totalProducts && totalProducts > 1)
            return NextResponse.json({ message: 'Page does not exist', success: false }, { status: 400 });
        const leftRange = Limit === 0 ? 1 : skip + 1;
        const rightRange = Limit === 0 ? totalProducts : Limit * pageNo;

        productData = productData.skip(skip).limit(Limit);
        const products = await productData;

        return NextResponse.json(
            {
                products,
                pageNo,
                itemRange: `${leftRange}-${rightRange}`,
                nbHits: products.length,
                totalProducts,
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.log('Error while fetching all products', error.message);
        return NextResponse.json({ message: error.message, success: false }, { status: 500 });
    }
};
