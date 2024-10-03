declare module 'multer-storage-cloudinary' {
  import { StorageEngine } from 'multer';
  import { v2 as cloudinary } from 'cloudinary';

  interface Params {
    folder: string;
    formats: string[];
  }

  interface Options {
    cloudinary: typeof cloudinary;
    params: Params | ((req: any, file: any) => Promise<Params> | Params);
  }

  export default class CloudinaryStorage {
    constructor(options: Options);
    // Define any methods you need here, or just leave it empty.
  }
}
