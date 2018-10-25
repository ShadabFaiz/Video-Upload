import * as express from 'express';
import { existsSync, mkdirSync } from 'fs';

import { config } from '../../../config';
import { MorganLogger } from './MorganLogger';
import { WinstonLoggger } from './WinstonLogger';

export class LogGenerator {
	private static instance: LogGenerator;
	private readonly logDirectory = config().logDirectory;

	public static getInstance() {
		if (!LogGenerator.instance) LogGenerator.instance = new LogGenerator();
		console.log('instantiating logGenerator');
		return LogGenerator.instance;
	}

	public startLogging(express: express.Application) {
		existsSync(this.logDirectory) || mkdirSync(this.logDirectory);
		this.startMorgan(express);
		this.startWinston();
	}

	private startMorgan(app: express.Application) {
		let logger = MorganLogger.getInstance();
		logger.initialize(this.logDirectory, app);
	}

	private startWinston() {
		let logger = WinstonLoggger.getInstance();
		logger.initialize(this.logDirectory);
	}
}
