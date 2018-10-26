import { ObjectId } from 'bson';

import { VideoService } from '../../service/video/VideoService';

export class VidoeController {
  private static instance: VidoeController;

  public static getInstance(): VidoeController {
    if (!VidoeController.instance)
      VidoeController.instance = new VidoeController();
    return VidoeController.instance;
  }

  public getVidoeList() {
    let service = VideoService.getInstance();
    return service.getVideoList();
  }

  public getVideo(_id: ObjectId) {
    let service = VideoService.getInstance();
    return service.getVideo(_id);
  }

  public saveVideo(
    files:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        }
  ) {
    let service = VideoService.getInstance();
    let file: Express.Multer.File = files[0];
    return service.saveVideo(file);
  }
}
