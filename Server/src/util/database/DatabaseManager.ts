import { CollectionCreateOptions, Db, GridFSBucket, MongoClient, MongoClientOptions } from 'mongodb';

import { config } from '../../../config';

export class DatabaseManager {
  private static database: Db;
  private static readonly OPTIONS: MongoClientOptions = {
    useNewUrlParser: true
  };
  private static readonly UserCollectionOptions: CollectionCreateOptions = {};

  private static gridFsBusket: GridFSBucket;

  private static videoCollectionName = 'Videos';

  private static defaultVideoData = {
    Name: 'Default_Video',
    size: '3MB'
  };

  public static connect() {
    let database = new MongoClient(
      config().databaseURL,
      DatabaseManager.OPTIONS
    );
    database
      .connect()
      .then(client => {
        console.log(`Database connected at: ${config().databaseURL}`);
        DatabaseManager.database = client.db();
        DatabaseManager.setupDatabaseListener(client);
        DatabaseManager.createCollections(DatabaseManager.database);
        DatabaseManager.setUpGridFs(DatabaseManager.database);
        DatabaseManager.ListAllCollections(DatabaseManager.database);
      })
      .catch(err => console.log(err));
  }

  private static setUpGridFs(database: Db) {
    DatabaseManager.gridFsBusket = new GridFSBucket(database);
  }

  private static setupDatabaseListener(dbClient: MongoClient) {
    dbClient.on('close', DatabaseManager.closeDatabaseConnection);
  }

  private static createCollections(database: Db) {
    DatabaseManager.createUserCollection(database);
  }

  private static ListAllCollections(database: Db) {
    database.collections().then(res => {
      // console.log('All available collections');
      // console.log(res);
    });
  }

  private static createUserCollection(database: Db) {
    database.createCollection('User', DatabaseManager.UserCollectionOptions);
  }

  public getDatabase(): Db {
    return DatabaseManager.database;
  }

  private static closeDatabaseConnection(...args: any[]) {
    console.log('Closing database connection');
  }

  public static getGridFsBucket() {
    return this.gridFsBusket;
  }

  // public static getGridFs2() {
  //   console.log('creating gfs');
  //   console.log(this.database);
  //   let stream = gfs(this.database, MongoClient);
  //   console.log('gfs');
  //   return stream;
  // }
}
