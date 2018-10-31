import { ObjectId } from 'bson';

import { AWSService } from '../../service/AWS/AWSService';
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

  public async saveVideo(file: Express.Multer.File) {
    let savedVideo = await this.saveVideoToAWS(file);
    let service = VideoService.getInstance();
    return service.saveVideoData(file, savedVideo);
  }

  private saveVideoToAWS(file: Express.Multer.File) {
    let awsService = AWSService.getInstance();
    return awsService.saveFile(file);
  }
}
