import {Router, Request, Response, NextFunction} from 'express';
import { UserCtrl } from '../../controller/authentication/UserCtrl';
import * as passportjwt from 'passport-jwt';
import { AuthenticationCtrl } from '../../controller/authentication/AuthenticationCtrl';
import * as passport from 'passport';

export class AuthenticateRouter {

  private static router: Router;

  public static getInstance(){
    if (AuthenticateRouter.router == null){
      let ar = new AuthenticateRouter();
      ar.init();
    }
    return AuthenticateRouter.router;
  }

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    AuthenticateRouter.router = Router();
  }


  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    AuthenticateRouter.router.post('/',  AuthenticationCtrl.getInstance().login);
  }

}
