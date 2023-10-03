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

  // Validation schema for filter
  filter = {
    body: z.object({
      type: z.enum(['grayscale', 'sepia', 'invert', 'brightness', 'contrast', 'saturation']),
      range: z
        .string()
        .min(0)
        .max(100)
        .refine((value) => Number(value), {}),
      color: z.enum([
        'none',
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'pink',
        'brown',
        'gray',
        'black',
        'white',
      ]), // Enum values for valid colors
    }),
  };

  // Validation schema for the "border" operation
  border = {
    body: z.object({
      width: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}), // Width of the border
      color: z.enum([
        'none',
        'red',
        'green',
        'blue',
        'yellow',
        'orange',
        'purple',
        'pink',
        'brown',
        'gray',
        'black',
        'white',
      ]), // Valid border colors
    }),
  };

  rotate = {
    body: z.object({
      angle: z
        .string()
        .min(1)
        .refine((value) => Number(value), {}), // Angle of rotation
    }),
  };

  format = {
    body: z.object({
      new_format: z.enum(['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff']), // Desired image format
    }),
  };

  // Validation schema for the "quality" operation
  quality = {
    body: z.object({
      new_quality: z.number().min(1).max(100), // Desired image quality (1-100)
    }),
  };
}

export const uploadValidation = new Validation();
