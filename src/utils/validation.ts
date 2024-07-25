import { z } from 'zod';

export const AddressSchema = z.object({
  name: z.string().min(2).max(50),
  street: z.string().min(2).max(100),
  city: z.string().min(2).max(50),
  state: z.string().min(2).max(50),
  postalCode: z.string().min(5).max(10),
});
