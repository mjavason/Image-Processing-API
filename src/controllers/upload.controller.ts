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
      transformation: [{ width: resizeWidth, height: resizeHeight, crop: 'fill' }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
    return;
  }

  async applyFilter(req: Request, res: Response) {
    const filterType = req.body.type; // Filter type, e.g., 'grayscale', 'sepia', etc.
    const filterColor = req.body.color || 'none'; // Optional filter color, defaulting to 'none'
    const filterRange = req.body.range || 50; // Optional filter range, defaulting to 50

    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB

    // Set options for applying a filter
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ effect: `${filterType}:${filterRange}`, color: filterColor }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
    return;
  }

  async applyBorder(req: Request, res: Response) {
    const borderWidth = req.body.width; // Border width
    const borderColor = req.body.color || 'none'; // Optional border color, defaulting to 'none'

    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB

    // Set options for applying a border
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ border: `${borderWidth}px_solid_${borderColor}` }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
  }

  async applyRotate(req: Request, res: Response) {
    const rotationAngle = req.body.angle; // Rotation angle in degrees

    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB

    // Set options for rotating the image
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ rotate: rotationAngle }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
  }

  async changeFormat(req: Request, res: Response) {
    const newFormat = req.body.newFormat; // Desired image format

    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB

    // Set options for changing the image format
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'tiff'],
      transformation: [{ format: newFormat }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
  }

  async reduceQuality(req: Request, res: Response) {
    const newQuality = req.body.newQuality; // Desired image quality (1-100)

    const maxFileSizeBytes = 1 * 1024 * 1024; // 1MB

    // Set options for reducing the image quality
    const options = {
      folder: 'temp-folder',
      allowed_formats: ['jpg', 'jpeg', 'png'],
      transformation: [{ quality: newQuality }],
      max_bytes: maxFileSizeBytes,
    };

    await processImage(req, res, options, maxFileSizeBytes);
  }
}

export const uploadController = new Controller();
