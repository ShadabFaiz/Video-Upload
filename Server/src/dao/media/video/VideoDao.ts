import {
  Db,
  GridFSBucket,
  GridFSBucketOpenUploadStreamOptions,
  GridFSBucketReadStream,
  GridFSBucketWriteStream,
  ObjectID,
  ObjectId,
} from 'mongodb';

import { DatabaseManager } from '../../../util/database/DatabaseManager';

export class VideoDao {
  public static instance: VideoDao;
  private database: Db;
  private grid: GridFSBucket;

  constructor() {
    this.initialize();
  }

  public static getInstance() {
    if (!VideoDao.instance) VideoDao.instance = new VideoDao();
    return VideoDao.instance;
  }

  private initialize() {
    let dbManager = new DatabaseManager();
    this.database = dbManager.getDatabase();
    this.initializeGridFs();
  }

  private initializeGridFs() {
    this.grid = DatabaseManager.getGridFsBucket();
  }

  public getVideoList() {
    return this.database
      .collection('Videos')
      .find({})
      .toArray();
  }

  public saveVideo(videoDetails: {}) {
    return this.database.collection('Videos').insertOne(videoDetails);
  }

  public async getVideo(objectId: ObjectId): Promise<any> {
    let fs = DatabaseManager.getGridFsBucket();
    return Promise.resolve(fs.openDownloadStream(new ObjectID(objectId)));
  }

  public getVideoDetails(objectId: ObjectId) {
    return this.grid
      .find({ _id: new ObjectId(objectId) })
      .limit(1)
      .toArray()
      .then(res => res[0]);
  }

  public getDefaultVideo() {
    return this.database.collection('Videos').findOne({
      Name: 'Default_Video'
    });
  }

  private getGridUplaodOptions(file: Express.Multer.File) {
    let options: GridFSBucketOpenUploadStreamOptions = {
      contentType: file.mimetype,
      metadata: {
        encoding: file.encoding
      }
    };
    return options;
  }

  private getWriteStream(
    file: Express.Multer.File,
    fileNameToSave: string
  ): GridFSBucketWriteStream {
    let options = this.getGridUplaodOptions(file);
    let stream = this.grid.openUploadStream(fileNameToSave, options);
    this.addGridListeners(stream);
    return stream;
  }

  private writeVideoToDatabase(
    gfsWriteStream: GridFSBucketWriteStream,
    data: Buffer
  ): Promise<boolean> {
    gfsWriteStream.write(data);
    return new Promise((resolve, reject) => {
      return gfsWriteStream.end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
  }

  private addGridListeners(
    stream: GridFSBucketWriteStream | GridFSBucketReadStream
  ) {
    stream.on('open', (...args) => console.log(`Stream is open`));
    stream.on('data', (...args) => {
      console.log('reading data');
      console.log(args);
    });
    stream.on('close', (...args) => console.log('Stream is closing'));
    stream.on('error', err => console.error(err));
    stream.on('finish', (...args) => {
      console.log('finsihed writing data');
    });
  }
}
