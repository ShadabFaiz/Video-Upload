import { ObjectId } from 'bson';

import { VideoDao } from '../../dao/media/video/VideoDao';
import { User } from '../../entity/security/User';

export class VideoService {
  private static instance: VideoService;

  public static getInstance(): VideoService {
    if (!VideoService.instance) {
      VideoService.instance = new VideoService();
    }
    return VideoService.instance;
  }

  private async addDefaultDatas(user: User) {
    let dao = VideoDao.getInstance();
    const defaultVideo = await dao.getDefaultVideo();
    user.video = [defaultVideo._id];
    return user;
  }

  public getVideoList() {
    let dao = VideoDao.getInstance();
    return dao.getVideoList();
  }

  public saveVideo(file: Express.Multer.File) {
    let dao = VideoDao.getInstance();
    return dao.saveVideo(file);
  }

  public getVideo(_id: ObjectId) {
    let dao = VideoDao.getInstance();
    return Promise.all([dao.getVideo(_id), dao.getVideoDetails(_id)]);
  }
}
