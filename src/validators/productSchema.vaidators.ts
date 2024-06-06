import { z } from 'zod';

const title = z.string({ required_error: 'title is required' });
const description = z.string({ required_error: 'description is required' });
const price = z.number({ required_error: 'price is required' });
const category = z.string({ required_error: 'category is required' });
const brand = z.string({ required_error: 'brand is required' });
const quantity = z.number({ required_error: 'quantity is required' });
const colors = z.array(z.string({ required_error: 'title is required' })).optional();
const tags = z.array(z.string().optional());

export const CreateProductValidator = z.object({
    title,
    description,
    price,
    category,
    brand,
    quantity,
    colors,
    tags,
});

export const UpdateProductValidator = z.object({
    title: title.optional(),
    description: description.optional(),
    price: price.optional(),
    category: category.optional(),
    brand: brand.optional(),
    quantity: quantity.optional(),
    colors: colors.optional(),
    tags: tags.optional(),
});
