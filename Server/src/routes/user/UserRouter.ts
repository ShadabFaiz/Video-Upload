import { NextFunction, Request, Response, Router } from 'express';

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
  }
}
