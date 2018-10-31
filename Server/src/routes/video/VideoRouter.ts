import { NextFunction, Request, Response, Router } from 'express';
import { createWriteStream } from 'fs';

import { VidoeController } from '../../controller/video/VideoController';
import { VideoDao } from '../../dao/media/video/VideoDao';
import { AWSService } from '../../service/AWS/AWSService';

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
    let dao = VideoDao.getInstance();
    dao
      .getVideoList()
      .then(list => res.send(list))
      .catch(err => this.handleError(err, res));
  }

  public saveVideo = (req: Request, res: Response, next: NextFunction) => {
    let ctrl = VidoeController.getInstance();
    ctrl
      .saveVideo(req.files[0])
      .then(videoDetails => res.send({ file: videoDetails }))
      .catch(err => this.handleError(err, res));
  }

  public getVideo = (req: Request, res: Response, next: NextFunction) => {
    let service = AWSService.getInstance();
    service
      .getFile('videouploader.bucket', req.params.fileName)
      .then(file => {
        res.contentType(file.ContentType);
        res.send(file.$response.httpResponse);
        res.on('close', () => console.log('close'));
        res.on('finish', () => res.end());
      })
      .catch(err => this.handleError(err, res));
  }

  public getAllBucket = (req: Request, res: Response, next: NextFunction) => {
    let service = AWSService.getInstance();
    service
      .getAllBucket()
      .then(bucket => res.send(bucket))
      .catch(err => this.handleError(err, res));
  }

  // public createBucket = (req: Request, res: Response, next: NextFunction) => {
  //   let aws = new AWSService();
  // }

  private writeToDisk(result) {
    let writeStream = createWriteStream('/home/Faiz/testing.pdf');
    writeStream.on('close', () => console.log('writing to file closed'));
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
    VideoRouer.router.get('/bucket/all', this.getAllBucket);
    VideoRouer.router.get('/:fileName', this.getVideo);
  }
}
