import 'reflect-metadata';

import * as debug from 'debug';
import * as http from 'http';

import App from './App';

debug('ts-express:server');
const normalizePort = (val: number | string): number | string | boolean => {
  // tslint:disable-next-line:no-shadowed-variable
  let port: number = typeof val === 'string' ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
};

const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

const onError = (error: NodeJS.ErrnoException) => {
  if (error.syscall !== 'listen') throw error;
  let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const listening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Server started at port: ${addr.port}`);
};

const onClosing = reason => {
  console.log(`Process stopped: \n ${JSON.stringify(reason)}`);
  process.exit(1);
};

const onException = exception => {
  console.log(exception);
  process.exit(1);
};

const server = http.createServer(App);
server.listen(port);
server.on('error', onError);
server.on('listening', listening);
server.on('close', onClosing);
server.on('uncaughtException', onException);
