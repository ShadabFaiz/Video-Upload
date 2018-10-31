import * as aws from 'aws-sdk';
import { GetObjectRequest } from 'aws-sdk/clients/s3';
import { APIVersions, ConfigurationOptions } from 'aws-sdk/lib/config';
import { readFileSync } from 'fs';
import * as https from 'https';

export class AWSService {
  private static instance: AWSService;
  private s3: aws.S3;
  private videoBucket = "videouploader.bucket";
  private readonly globalConfig: ConfigurationOptions & APIVersions = {
    apiVersion: process.env.AWS_apiVersion,
    logger: console
    // httpOptions: this.getGlobalHttpsOptions()
  };

  constructor() {
    /* Always at the top */
    this.initializeGlobalConfig();
    this.initializeS3();
  }

  public static getInstance() {
    if (!AWSService.instance) AWSService.instance = new AWSService();
    return AWSService.instance;
  }

  public getFile(bucketName: string, fileName: string) {
    let op = { Bucket: bucketName };
    let tt: GetObjectRequest = {
      Bucket: bucketName,
      Key: fileName
    };
    return this.s3.getObject(tt).promise();

    // return Promise.resolve(this.s3.getObject(tt).createReadStream());
  }

  public getAllFiles() {
    let op = { Bucket: this.videoBucket };
    return this.s3.listObjects(op).promise();
  }

  public saveFile(file: Express.Multer.File) {
    let op: aws.S3.PutObjectRequest = {
      ACL: "public-read",
      Bucket: "videouploader.bucket",
      Key: file.originalname,
      ContentType: file.mimetype,
      Body: file.buffer
    };
    let stream = this.s3.createMultipartUpload(op);
    return this.s3.upload(op).promise();
  }

  public getAllBucket() {
    return this.s3.listBuckets().promise();
  }

  public createBucket() {
    let op = { Bucket: "videouploader3.bucket" };
    let obj = new aws.S3()
      .createBucket(op)
      .promise()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  private getGlobalHttpsOptions() {
    return {
      agent: new https.Agent({
        rejectUnauthorized: true,
        ca: [readFileSync("/home/Faiz/VideoUpload_Node.cer")]
      })
    };
  }

  private initializeGlobalConfig() {
    aws.config.update(this.globalConfig);
  }

  private initializeS3() {
    this.s3 = new aws.S3();
  }
}
