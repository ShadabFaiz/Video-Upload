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

  public saveVideo(file: Express.Multer.File) {
    let fileNameToSave = file.fieldname ? file.fieldname : file.originalname;
    let gfsWriteStream = this.getWriteStream(file, fileNameToSave);
    // console.log(file);
    // console.log(gfsWriteStream);
    // return Promise.resolve(true);
    return this.writeVideoToDatabase(gfsWriteStream, file.buffer);
  }

  public async getVideo(objectId: ObjectId): Promise<any> {
    // let gfsReadStream = this.getReadStream(objectId);
    let fs = DatabaseManager.getGridFsBucket();
    return Promise.resolve(fs.openDownloadStream(new ObjectID(objectId)));
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
    // let readable = new Readable();
    // readable.push(data);
    // readable.pipe(gfsWriteStream);

    gfsWriteStream.write(data);
    // let temp = createReadStream(
    //   '/home/Faiz/Jessica Jones S01E01 720p-[Nightsdl.Com].mkv'
    // );
    // temp.pipe(gfsWriteStream);
    return new Promise((resolve, reject) => {
      return gfsWriteStream.end((err, res) => {
        // if (err) console.error('Error while write to datbase');
        // else console.log(`No Error while write:\n ${JSON.stringify(res)}`);
        if (err) reject(err);
        else resolve(true);
      });
    });
  }

  private readStream(stream: GridFSBucketReadStream) {
    console.log('starting to read');
    return stream;
  }

  // private getReadStream(_id: ObjectID) {
  //   let stream = this.grid.openDownloadStream(_id);
  //   this.addGridListeners(stream);
  //   return stream;
  // }

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
      console.log(args);
    });
  }
}
