const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.json(),
  ),
  label: 'Bibliotech',
  transports: [
    new transports.Console({
      colorize: true,
      prettyPrint: true,
      timestamp: true,
      label: 'Bibliotech Log:',
      format: format.combine(
        format.colorize(),
        format.printf(
          info =>
            `Bibliotech Log [${info.timestamp}]: ${info.level} -> ${
              info.message
            }`,
        ),
      ),
    }),
  ],
});

module.exports = logger;
