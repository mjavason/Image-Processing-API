import cloudinaryV2 from '../config/upload.config';
import logger from '../helpers/logger';

class Service {
  async uploadFileToCloudinary(dataURI: string, options: object) {
    try {
      const cldRes = await cloudinaryV2.uploader.upload(dataURI, options);

      return cldRes;
    } catch (error: any) {
      logger.error(error);

      return false;
    }
  }
}

export const uploadService = new Service();
