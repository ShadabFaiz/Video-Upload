import * as path from 'path';

const configurations = {
  production: {
    logDirectory: path.join(process.cwd(), 'logs'),
    serverUri: 'http://localhost:4200',
    databaseURL: 'mongodb://localhost:27017/test'
  },
  development: {
    logDirectory: path.join(process.cwd(), 'logs'),
    serverUri: 'http://localhost:4200',
    databaseURL: 'mongodb://localhost:27017/test'
  }
};

export const config = () => {
  return process.env.NODE_ENV !== 'production'
    ? configurations.development
    : configurations.production;
};
