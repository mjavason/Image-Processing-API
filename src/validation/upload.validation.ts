import { number, z } from 'zod';

class Validation {
  crop = {
    body: z.object({
      width: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}),
      height: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}),
    }),
  };

  resize = {
    body: z.object({
      width: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}),
      height: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}),
    }),
  };
}

export const uploadValidation = new Validation();
