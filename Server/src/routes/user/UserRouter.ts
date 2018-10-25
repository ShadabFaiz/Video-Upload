import { NextFunction, Request, Response, Router } from 'express';
import { createWriteStream } from 'fs';

import { UserCtrl } from '../../controller/user/UserCtrl';

export class UserRouter {
  private static router: Router;

  public static getInstance(): Router {
    if (!UserRouter.router) {
      let ur = new UserRouter();
    }
    return UserRouter.router;
  }

  constructor() {
    UserRouter.router = Router();
    this.initialize();
  }

  public getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .getAllUsers()
      .then(users => res.send(users))
      .catch(err => this.handleError(err, res));
  }

  public createUser = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    ctrl
      .createUser(req.body.user)
      .then(result => res.send({ message: 'Account created successfully.' }))
      .catch(err => this.handleError(err, res));
  }

  public saveVideo = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    // console.log(req.files);
    ctrl.saveVideo(req.files).then(status => res.send({ status }));
  }

  public getVideo = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = UserCtrl.getInstance();
    res.contentType('image/jpeg');
    ctrl.getVideo(req.params['objectId']).then(result => {
      // this.writeToDisk(result);
      result.pipe(res);
      result.on('end', () => res.end());
      result.on('close', () => console.log('closing'));
    });
  }

  private writeToDisk(result) {
    let writeStream = createWriteStream('/home/Faiz/testing.jpeg');
    result.pipe(writeStream);
  }

  private logRequest(req: Request, res: Response, next: NextFunction) {
    // info(
    //   `${JSON.stringify(req.originalUrl)}, User: ${JSON.stringify(
    //     req.user
    //   )},  Request Body: ${JSON.stringify(
    //     req.body
    //   )}, Request Params: ${JSON.stringify(req.params)}`
    // );
    next();
  }

  private handleError(err: { status: number; message: string }, res: Response) {
    console.log(err);
    if (err.status) res.status(err.status).send({ message: err.message });
    else res.status(500).send({ message: 'Internal Serve Error' });
  }

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  initialize() {
    UserRouter.router.get(
      '/getall',
      // passport.authenticate('jwt', { session: false }),
      this.logRequest,
      this.getAllUsers
    );

    UserRouter.router.post('/create', this.createUser);
    UserRouter.router.post('/save', this.saveVideo);
    UserRouter.router.get('/video/:objectId', this.getVideo);
  }
}
