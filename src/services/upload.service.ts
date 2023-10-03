import cloudinaryV2 from '../config/upload.config';

class Service {
  async uploadFileToCloudinary(dataURI: string, options: object) {
    try {
      const cldRes = await cloudinaryV2.uploader.upload(dataURI, options);

      return cldRes;
    } catch (error: any) {
      console.log(error);

      return false;
    }
  }
}

export const uploadService = new Service();
