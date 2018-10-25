import {Router, Request, Response, NextFunction} from 'express';
import { UserCtrl } from '../../controller/authentication/UserCtrl';
import * as passport from 'passport';
import { ExtractJwt } from 'passport-jwt';
import { HashController } from '../../controller/authentication/HashController';

export class HashRouter {

    private static router: Router;

    constructor(){
        HashRouter.router = Router();
        this.init();
    }

    public static getInstance(): Router{
        if(HashRouter.router == null || HashRouter == undefined){
            let Obj = new HashRouter();
        }
        return HashRouter.router;
    }

    public verify(req: Request, res: Response, next: NextFunction){
        let ctrl = HashController.getInstance();
        console.log("Inside router..");
        ctrl.verifyHash(req.body.hash, res);
    }

    public test(req: Request, res: Response){
        console.log("Req Body:");
        console.log(req.body);
        console.log(req.params);
        console.log("Redirecting");
        // res.render('response.ejs',{ 'restdata' : "true" ,'paramlist' : paramlist});
        // res.writeHead(200, {Location : "http://localhost:4200/cart/paymentresult"});
        // return res.end();
        res.redirect('http://localhost:4200/cart/paymentresult');
        // res.send(req.body);
    }

    public init(){
        HashRouter.router.post('/verify', this.verify);
        HashRouter.router.post('/test', this.test);
    }
}