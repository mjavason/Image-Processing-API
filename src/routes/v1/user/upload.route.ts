import { Router, Request, Response } from 'express';
const router = Router();
import { upload } from '../../../config/upload.config';
import { uploadController } from '../../../controllers';
import { uploadValidation } from '../../../validation';
import { processRequestBody } from 'zod-express-middleware';

// crop image
router.post(
  '/crop',
  processRequestBody(uploadValidation.crop.body),
  upload.single('image'),
  uploadController.cropImage,
);

//resize an image
router.post(
  '/resize',
  processRequestBody(uploadValidation.resize.body),
  upload.single('image'),
  uploadController.resizeImage,
);

export default router;
