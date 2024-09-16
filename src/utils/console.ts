interface ILogger {
  info(msg: any, ...args: any[]): void;

  warn(msg: any, ...args: any[]): void;

  error(msg: any, ...args: any[]): void;

  debug(msg: any, ...args: any[]): void;
}

export let logger: ILogger = console;

export const setLogger = (v: ILogger) => (logger = v);
