import * as express from 'express';
import { Application } from 'express-serve-static-core';
import * as morgan from 'morgan';
import * as Path from 'path';
import RotatingFileStream from 'rotating-file-stream';

export class MorganLogger {
	private static instance: MorganLogger;

	public static getInstance() {
		if (!MorganLogger.instance) MorganLogger.instance = new MorganLogger();
		return MorganLogger.instance;
	}

	public initialize(logDirectory: string, app: express.Application) {
		this.initializeAllLogs(logDirectory, app);
		this.initializeErrorLogs(logDirectory, app);
	}

	private initializeAllLogs(logDirectory: string, app: Application) {
		const allLogStream = RotatingFileStream('access.log', {
			interval: '1d',
			path: Path.join(logDirectory, 'https'),
			rotationTime: true,
			size: '10M'
		});
		app.use(morgan('combined', { stream: allLogStream }));
	}

	private initializeErrorLogs(logDirectory: string, app: Application) {
		const errorLogStream = RotatingFileStream('error.log', {
			interval: '1d',
			path: Path.join(logDirectory, 'https'),
			rotationTime: true,
			size: '10M'
		});
		app.use(
			morgan('combined', {
				skip: (req, res) => {
					return res.statusCode < 400;
				},
				stream: errorLogStream
			})
		);
	}
}
