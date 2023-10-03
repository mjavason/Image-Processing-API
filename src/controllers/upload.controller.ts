import { Request, Response } from 'express';
import { BadRequestResponse, SuccessResponse } from '../helpers/response';
import { uploadService } from '../services';

async function processImage(
  req: Request,
  res: Response,
  options: object,
  maxFileSizeBytes: number,
) {
  const fileUploadBuffer = req.file?.buffer;
  const fileUploadMimeType = req.file?.mimetype;

  if (!fileUploadBuffer || !fileUploadMimeType) {
    return BadRequestResponse(res, 'Invalid file data');
  } else {
    const b64 = Buffer.from(fileUploadBuffer).toString('base64');
    let dataURI = 'data:' + fileUploadMimeType + ';base64,' + b64;

    // Check the file size before uploading to Cloudinary
    if (dataURI.length > maxFileSizeBytes)
      return BadRequestResponse(res, 'Image size exceeds limit of 100kb');

    const cldRes = await uploadService.uploadFileToCloudinary(dataURI, options);

    return SuccessResponse(res, cldRes);
  }
}

class Controller {
  async cropImage(req: Request, res: Response) {
    const cropWidth = req.body.width;
    const cropHeight = req.body.height;

    const maxFileSizeBytes = 1 * 1024 * 1024; // 5MB

    //set options
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [
        { width: cropWidth, height: cropHeight, crop: 'crop' },
        { gravity: 'center' },
      ],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
    return;
  }

  async resizeImage(req: Request, res: Response) {
    const resizeWidth = req.body.width; // Desired width for resizing
    const resizeHeight = req.body.height; // Desired height for resizing
  
    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB
  
    // Set options for resizing
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [
        { width: resizeWidth, height: resizeHeight, crop: 'fill' },
      ],
      max_bytes: maxFileSizeBytes,
    };
  
    await processImage(req, res, options, maxFileSizeBytes);
    return;
  }
}

export const uploadController = new Controller();
