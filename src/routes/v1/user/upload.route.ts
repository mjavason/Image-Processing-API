import { Router } from 'express';
import { upload } from '../../../config/upload.config';
import { uploadController } from '../../../controllers';
import { uploadValidation } from '../../../validation';
import { processRequestBody } from 'zod-express-middleware';

const router = Router();

// Crop an image
router.post(
  '/crop',
  processRequestBody(uploadValidation.crop.body),
  upload.single('image'),
  uploadController.cropImage,
);

// Resize an image
router.post(
  '/resize',
  processRequestBody(uploadValidation.resize.body),
  upload.single('image'),
  uploadController.resizeImage,
);

// Apply filter to an image
router.post(
  '/filter',
  processRequestBody(uploadValidation.filter.body),
  upload.single('image'),
  uploadController.applyFilter,
);

// Apply border to an image
router.post(
  '/border',
  processRequestBody(uploadValidation.border.body),
  upload.single('image'),
  uploadController.applyBorder,
);

// Rotate an image
router.post(
  '/rotate',
  processRequestBody(uploadValidation.rotate.body),
  upload.single('image'),
  uploadController.applyRotate,
);

// Change the format of an image
router.post(
  '/format',
  processRequestBody(uploadValidation.format.body),
  upload.single('image'),
  uploadController.changeFormat,
);

// Reduce the quality of an image
router.post(
  '/quality',
  processRequestBody(uploadValidation.quality.body),
  upload.single('image'),
  uploadController.reduceQuality,
);

export default router;
