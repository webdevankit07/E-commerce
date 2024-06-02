import { Schema } from 'zod';

export const validate = async (body: unknown, schema: Schema) => {
    try {
        const parseData = await schema.parseAsync(body);
        return parseData;
    } catch (err: any) {
        throw new Error(err.errors[0].message);
    }
};
