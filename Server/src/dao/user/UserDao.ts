import { Db } from 'mongodb';

import { User } from '../../entity/security/User';
import { DatabaseManager } from '../../util/database/DatabaseManager';

export class UserDao {
  private static instance: UserDao;
  private database: Db;

  constructor() {
    this.initialize();
  }

  public static getInstance() {
    if (!UserDao.instance) {
      UserDao.instance = new UserDao();
    }
    return UserDao.instance;
  }

  private initialize() {
    let dbManager = new DatabaseManager();
    this.database = dbManager.getDatabase();
  }

  public createUser(user: User) {
    return this.database.collection('User').insertOne(user);
  }

  public getAllUser() {
    return this.database
      .collection('User')
      .find()
      .toArray();
  }
}
