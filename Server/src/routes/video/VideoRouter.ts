import { NextFunction, Request, Response, Router } from 'express';
import { createWriteStream } from 'fs';

import { VidoeController } from '../../controller/video/VideoController';

export class VideoRouer {
  private static router: Router;

  public static getInstance(): Router {
    if (!VideoRouer.router) {
      let ur = new VideoRouer();
    }
    return VideoRouer.router;
  }

  constructor() {
    VideoRouer.router = Router();
    this.initialize();
  }

  public getVidoeList = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = VidoeController.getInstance();
    ctrl
      .getVidoeList()
      .then(list => {
        console.log('Sending list');
        res.send(list);
      })
      .catch(err => this.handleError(err, res));
  }

  public saveVideo = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = VidoeController.getInstance();
    ctrl.saveVideo(req.files).then(file => {
      res.send({ file });
    });
  }

  public getVideo = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = VidoeController.getInstance();
    ctrl.getVideo(req.params['objectId']).then(result => {
      // res.contentType(result[1].contentType);
      result[0].pipe(res);
      result[0].on('end', () => res.end());
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
    VideoRouer.router.get(
      '/all',
      // passport.authenticate('jwt', { session: false }),
      this.logRequest,
      this.getVidoeList
    );

    VideoRouer.router.post('/save', this.saveVideo);
    VideoRouer.router.get('/:objectId', this.getVideo);
  }
}
