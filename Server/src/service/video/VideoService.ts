import { ManagedUpload } from 'aws-sdk/clients/s3';
import { ObjectId } from 'bson';

import { VideoMapUtil } from '../../controller/util/VidoeMapUtil';
import { VideoDao } from '../../dao/media/video/VideoDao';

export class VideoService {
  private static instance: VideoService;

  public static getInstance(): VideoService {
    if (!VideoService.instance) VideoService.instance = new VideoService();

    return VideoService.instance;
  }

  public getVideoList() {
    let dao = VideoDao.getInstance();
    return dao.getVideoList();
  }

  public saveVideoData(
    file: Express.Multer.File,
    savedData: ManagedUpload.SendData
  ) {
    let dao = VideoDao.getInstance();
    let videoData = VideoMapUtil.mapDbData(file, savedData);
    return dao.saveVideo(videoData).then(result => videoData);
  }

  public getVideo(_id: ObjectId) {
    let dao = VideoDao.getInstance();
    return Promise.all([dao.getVideo(_id), dao.getVideoDetails(_id)]);
  }
}
