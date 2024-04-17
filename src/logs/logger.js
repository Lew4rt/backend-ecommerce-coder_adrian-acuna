import { createLogger, format, transports } from 'winston';

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

const colors = {
    debug: 'blue',
    http: 'green',
    info: 'cyan',
    warning: 'yellow',
    error: 'red',
    fatal: 'magenta',
};

const logFormat = format.combine(
    format.colorize({ colors }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(({ level, message, timestamp }) => `${timestamp} ${level}: ${message}`)
);

const developmentTransports = [
    new transports.Console({
        level: 'debug'
    }),
];

const productionTransports = [
    new transports.File({ filename: 'errors.log', level: 'info' }),
];

const logger = createLogger({
    levels,
    format: logFormat,
    transports: process.env.NODE_ENV === 'production' ? productionTransports : developmentTransports,
});

format.colorize({ all: true });

export default logger;