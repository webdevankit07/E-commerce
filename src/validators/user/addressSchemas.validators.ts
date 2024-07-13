import { z } from 'zod';

const address = z.string({ required_error: 'address is required' });
const subAddress = z.string().optional();
const city = z.string({ required_error: 'city name is required' });
const state = z.string({ required_error: 'state name is required' });
const country = z.string({ required_error: 'country name is required' });
const postalCode = z.string({ required_error: 'postalCode is required' });

export const SaveAddressValidator = z.object({ address, subAddress, city, state, country, postalCode });
export const UpdateAddressValidator = z.object({
    city: city.optional(),
    state: state.optional(),
    country: country.optional(),
    postalCode: postalCode.optional(),
});
