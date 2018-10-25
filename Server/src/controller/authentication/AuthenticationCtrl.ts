import { Response } from 'express';
import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import { UserDao } from '../../dao/security/UserDao';
import { User } from '../../entity/security/User';
import { SecurityUtils } from '../../util/security/SecurityUtils';

export class AuthenticationCtrl {
  private static instance: AuthenticationCtrl;

  public static getInstance = () => {
    if (AuthenticationCtrl.instance == null) {
      AuthenticationCtrl.instance = new AuthenticationCtrl();
    }
    return AuthenticationCtrl.instance;
  }

  public initialize = () => {
    passport.use('jwt', this.getStrategy());
    return passport.initialize();
  }

  public authenticate = callback =>
    passport.authenticate(
      'jwt',
      { session: false, failWithError: true },
      callback
    )

  private genToken = (user: User): Object => {
    let expires = moment()
      .utc()
      .add({ days: 7 })
      .unix();
    let token = jwt.encode(
      {
        exp: expires,
        username: user.userName
      },
      process.env.JWT_SECRET
    );
    return {
      token: 'JWT ' + token,
      expires: moment.unix(expires).format(),
      user: user.userId
    };
  }

  public login = (req, res: Response) => {
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();

    let errors = req.validationErrors();
    if (errors) throw errors;
    UserDao.getInstance()
      .findByUserName(req.body.username)
      .then(user => {
        if (user === null || user === undefined)
          throw new Error('Invalid Email.');
        UserDao.getInstance()
          .isUserActive(user)
          .then(flag => {
            if (flag === true) {
              SecurityUtils.compareString(
                req.body.password,
                user.userCredential.credential
              )
                .then(pass => {
                  if (pass === false) throw new Error('Incorrect Password');
                  res.status(200).json(this.genToken(user));
                })
                .catch(err => {
                  this.sendResponse(res, 401, err);
                });
            } else throw new Error('User Not Active');
          })
          .catch(err => {
            this.sendResponse(res, 401, err);
          });
      })
      .catch(err => {
        this.sendResponse(res, 401, err);
      });
  }

  private sendResponse(res: Response, code: number, err: string) {
    res.status(code).json({ message: 'Invalid credentials', errors: err });
  }

  private getStrategy = (): Strategy => {
    const params = {
      secretOrKey: 'mmcB7am97piy$W$S!dy!hu3Rauv^&g!L96',
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
      passReqToCallback: true
    };
    console.log(params.secretOrKey);
    return new Strategy(params, (req, payload: any, done) => {
      UserDao.getInstance()
        .findByUserName(payload.username)
        .then(user => {
          /* istanbul ignore next: passport response */
          if (user === null) {
            return done(null, false, {
              message: 'The user in the token was not found'
            });
          }
          console.log('-------------??????>>>' + user.userId);
          return done(null, { _id: user.userId, username: user.userName });
        });
    });
  }
}
