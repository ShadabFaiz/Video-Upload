import * as express from 'express';
import * as bodyParser from 'body-parser';
import { UserRouter } from './routes/user/UserRouter';
import * as passportjwt from 'passport-jwt';
import { AuthenticateRouter } from './routes/security/AuthenticateRouter';
import { Request, Response, NextFunction } from 'express';
import * as expressValidator from 'express-validator';
import { config } from '../config';
import { DatabaseManager } from './util/database/DatabaseManager';
import * as multer from 'multer';
// import { AuthenticationCtrl } from './controller/authentication/AuthenticationCtrl';

let extractJWT = passportjwt.ExtractJwt;
let jwtStrategy = passportjwt.Strategy;

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    // this.initializeLogger();
    this.createDatabaseConnection();
    this.routes();
  }

  private createDatabaseConnection() {
    DatabaseManager.connect();
  }

  // Configure Express middleware.
  private middleware(): void {
    // this.express.use('/app', express.static(path.resolve(__dirname, '../../client/app')));
    // this.express.use('/assets', express.static(path.resolve(__dirname, '../../client/assets')));
    // tslint:disable-next-line:max-line-length
    // this.express.use('/environments', express.static(path.resolve(__dirname, '../../client/environments')));
    // this.express.use(
    // 	express.static(path.resolve(__dirname, '../../client/dist'))
    // );
    // tslint:disable-next-line:max-line-length
    // this.express.use('/node_modules', express.static(path.resolve(__dirname, '../../../node_modules')));

    this.express.use(expressValidator());
    let mult = multer();
    this.express.use(mult.any());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    // this.express.use(AuthenticationCtrl.getInstance().initialize());
    this.express.use((req, res, next) => {
      // Website you wish to allow to connect
      // res.setHeader('Access-Control-Allow-Origin', 'https://mapmycareer.org');
      res.setHeader('Access-Control-Allow-Origin', '*');

      // Request methods you wish to allow
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
      );

      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      );

      // Set to true if you need the website to include cookies in the requests sent
      // to the API (e.g. in case you use sessions)
      res.setHeader('Access-Control-Allow-Credentials', 'true');

      // Pass to next layer of middleware
      next();
    });

    console.log(process.env.API_BASE);
    // this.express.all('api/v1/' + '*', this.authenticate);
    // createConnection();
  }

  private handleAuthenticationFailure(info: any, res: Response) {
    if (info.name === 'TokenExpiredError')
      return res.status(401).json({
        message: 'Your token has expired. Please generate a new one'
      });
    else return res.status(401).json({ message: info.message });
  }

  // private authenticate(req: Request, res: Response, next: NextFunction) {
  //   if (req.path.includes(process.env.API_BASE + 'authenticate')) return next();
  //   let controller = AuthenticationCtrl.getInstance();
  //   return controller.authenticate((err, user, info) => {
  //     if (err) return next(err);
  //     if (!user) this.handleAuthenticationFailure(info, res);
  //     this.express.set('user', user);
  //     return next();
  //   })(req, res, next);
  // }

  // private initializeLogger() {
  //   const logger = LogGenerator.getInstance();
  //   logger.startLogging(this.express);
  // }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    // this.express.use('/api/v1/authenticate', AuthenticateRouter.getInstance());
    this.express.use('/api/v1/user', UserRouter.getInstance());

    // Always at last
    this.express.use('*', router);
  }
}

export default new App().express;
