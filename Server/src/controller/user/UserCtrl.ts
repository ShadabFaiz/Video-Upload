import { ObjectId } from 'bson';

import { UserService } from '../../service/user/UserService';

export class UserCtrl {
  private static instance: UserCtrl;

  public static getInstance(): UserCtrl {
    if (!UserCtrl.instance) UserCtrl.instance = new UserCtrl();
    return UserCtrl.instance;
  }

  public createUser(user) {
    let service = UserService.getInstance();
    return service.create(user);
  }

  public getAllUsers() {
    let service = UserService.getInstance();
    return service.getAllUser();
  }

  public getVideo(_id: ObjectId) {
    let dao = UserService.getInstance();
    return dao.getVideo(_id);
  }

  public saveVideo(
    files:
      | Express.Multer.File[]
      | {
          [fieldname: string]: Express.Multer.File[];
        }
  ) {
    let service = UserService.getInstance();
    let file: Express.Multer.File = files[0];
    return service.saveVideo(file);
  }
}
