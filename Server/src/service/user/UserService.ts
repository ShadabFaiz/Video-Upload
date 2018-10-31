import { ObjectId } from 'bson';

import { VideoDao } from '../../dao/media/video/VideoDao';
import { UserDao } from '../../dao/user/UserDao';
import { User } from '../../entity/security/User';
import { SecurityUtils } from '../../util/security/SecurityUtils';

export class UserService {
  private static instance: UserService;

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async create(user: User) {
    let dao = UserDao.getInstance();
    user.credential = await SecurityUtils.encryptString(user.credential);
    user = await this.addDefaultDatas(user);
    return dao.createUser(user);
  }

  private async addDefaultDatas(user: User) {
    let dao = VideoDao.getInstance();
    const defaultVideo = await dao.getDefaultVideo();
    user.video = [defaultVideo._id];
    return user;
  }

  public getAllUser() {
    let dao = UserDao.getInstance();
    return dao.getAllUser();
  }

  public saveVideo(file: Express.Multer.File) {
    let dao = VideoDao.getInstance();
    // return dao.saveVideo(file);
  }

  public getVideo(_id: ObjectId) {
    let dao = VideoDao.getInstance();
    return dao.getVideo(_id);
  }
}
