import { Format } from 'logform';
import * as path from 'path';
import { add, configure, format, transports } from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

export class WinstonLoggger {
	private static instance: WinstonLoggger;

	public static getInstance() {
		if (!WinstonLoggger.instance) WinstonLoggger.instance = new WinstonLoggger();
		return WinstonLoggger.instance;
	}

	public initialize(logDirectory: string) {
		configure({
			exceptionHandlers: this.getExceptionHandler(logDirectory),
			exitOnError: false,
			format: this.logFormat(),
			level: 'info',
			transports: this.getTransportStreams(logDirectory)
		});
		if (process.env.NODE_ENV !== 'production') this.addDevLogger();
	}

	private logFormat(): Format {
		let customFormat = format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`);
		return format.combine(
			process.env.NODE_ENV !== 'production' ? format.colorize() : format.uncolorize(),
			format.timestamp(),
			format.json(),
			customFormat
		);
	}

	private getTransportStreams(logDirectory: string) {
		return [
			this.getErrorStream(logDirectory),
			this.getInfoStream(logDirectory),
			this.getDebugStream(logDirectory)
		];
	}

	private getErrorStream(logDirectory: string) {
		return new DailyRotateFile({
			filename: path.join(logDirectory, 'errors', 'error-%DATE%.log'),
			maxSize: '10m',
			level: 'error'
		});
	}

	private getExceptionHandler(logDirectory: string) {
		return [
			new DailyRotateFile({
				filename: path.join(logDirectory, 'exceptions', 'exceptions-%DATE%.log'),
				maxSize: '10m'
			})
		];
	}

	private getInfoStream(logDirectory) {
		return new DailyRotateFile({
			filename: path.join(logDirectory, 'info', 'info-%DATE%.log'),
			maxSize: '10m',
			level: 'info'
		});
	}

	private getDebugStream(logDirectory: string) {
		return new DailyRotateFile({
			filename: path.join(logDirectory, 'debug', 'debug -%DATE%.log'),
			maxSize: '10m',
			level: 'debug'
		});
	}

	private addDevLogger() {
		add(
			new transports.Console({
				format: this.logFormat()
			})
		);
	}
}
