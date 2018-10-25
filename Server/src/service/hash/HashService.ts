import {Router, Request, Response, NextFunction} from 'express';
import { UserVerificationStatus } from '../../entity/security/UserVerificationStatus';
import { UserVerificationDao } from '../../dao/security/UserVerificationDao';

export class HashService{

    private static instance: HashService;

    constructor(){
        
    }


    public static getInstance(): HashService    {
        if(HashService.instance == null || HashService.instance == undefined){
            HashService.instance = new HashService();
        }
        return HashService.instance;
    }

    public async isHashValid(hash): Promise<boolean>    {
        let status: boolean;
        let uvDAO = UserVerificationDao.getInstance();
        await uvDAO.findByHash(hash).then( (uvs) => {
            status = (uvs == null || uvs.userHash == '' || uvs == undefined || uvs.active == 'true') ? false: true;
            console.log("Searched Hash key:");
            console.log(uvs);
        }).catch(error => {
            console.error(error);
            throw {'message': 'Internal server Error', 'code': 401}
        });
        return status;
    }

}