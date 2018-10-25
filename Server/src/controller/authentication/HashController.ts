import {Router, Request, Response, NextFunction} from 'express';
import { UserVerificationStatus } from '../../entity/security/UserVerificationStatus';
import { UserVerificationDao } from '../../dao/security/UserVerificationDao';
import { HashService } from '../../service/hash/HashService';

export class HashController{

    private static instance: HashController;

    constructor(){
        
    }


    public static getInstance(): HashController{
        if(HashController.instance == null || HashController.instance == undefined){
            HashController.instance = new HashController();
        }
        return HashController.instance;
    }

    public  verifyHash(hash, res: Response){
        let hashService = HashService.getInstance();
         hashService.isHashValid(decodeURIComponent(hash)).then(status => {
            if(status)
                res.send({
                    'message': 'valid hash key.'
                });
            else 
            res.status(404).send({
                'message': 'invalid hash key.'
            });
        }).catch((error) => res.status(error.code).send(error.message));

    }

}