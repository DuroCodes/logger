/* eslint-disable no-console */
import colors from 'ansi-colors';
import { format } from 'util';

export type LogLevel = 'success' | 'error' | 'warn' | 'debug' | 'info';

export type LogStyle = 'bracket' | 'highlight';

type LoggerTitle = {
  [key in LogStyle]: string
};

type LoggerData = {
  [key in LogLevel]: {
    title: LoggerTitle;
    level: number;
    color: keyof typeof colors.styles;
  };
};

const loggerInfo: LoggerData = {
  success: {
    title: {
      highlight: colors.greenBright.inverse.bold(' SUCCESS '),
      bracket: colors.greenBright.bold('[SUCCESS]'),
    },
    color: 'greenBright',
    level: 5,
  },
  error: {
    title: {
      highlight: colors.redBright.inverse.bold(' ERROR '),
      bracket: colors.redBright.bold('[ERROR]'),
    },
    color: 'redBright',
    level: 4,
  },
  warn: {
    title: {
      highlight: colors.yellowBright.inverse.bold(' WARN '),
      bracket: colors.yellowBright.bold('[WARN]'),
    },
    color: 'yellowBright',
    level: 3,
  },
  debug: {
    title: {
      highlight: colors.magentaBright.inverse.bold(' DEBUG '),
      bracket: colors.magentaBright.bold('[DEBUG]'),
    },
    color: 'magentaBright',
    level: 2,
  },
  info: {
    title: {
      highlight: colors.cyanBright.inverse.bold(' INFO '),
      bracket: colors.cyanBright.bold('[INFO]'),
    },
    color: 'cyanBright',
    level: 1,
  },
};

interface LoggerOptions {
  logLevel?: LogLevel;
  logStyle?: LogStyle;
}

export class Logger extends console.Console {
  private logLevel: LogLevel = 'success';

  private logStyle: LogStyle = 'highlight';

  constructor(options?: LoggerOptions) {
    super({ stdout: process.stdout });
    Object.assign(this, options);
  }

  private checkLevel(log: LogLevel) {
    const existingLevel = loggerInfo[this.logLevel].level;
    const { level } = loggerInfo[log];
    return (existingLevel >= level);
  }

  private logMessage(message: string, level: LogLevel) {
    if (this.checkLevel(level)) {
      const { title, color } = loggerInfo[level];
      console.log(`${title[this.logStyle]} ${colors[color](message)}`);
    }
  }

  success(...args: unknown[]) {
    this.logMessage(format(...args), 'success');
  }

  override error(...args: unknown[]) {
    this.logMessage(format(...args), 'error');
  }

  override warn(...args: unknown[]) {
    this.logMessage(format(...args), 'warn');
  }

  override debug(...args: unknown[]) {
    this.logMessage(format(...args), 'debug');
  }

  override info(...args: unknown[]) {
    this.logMessage(format(...args), 'info');
  }

  override log(...args: unknown[]) {
    this.log(format(...args));
  }
}
