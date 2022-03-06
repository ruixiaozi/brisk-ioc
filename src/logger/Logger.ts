import { ILoggerOption } from './../interface/option/ILoggerOption';
import { createLogger, format, transports, Logger as _Logger, LoggerOptions } from 'winston';
import 'winston-daily-rotate-file';
import TransportStream from 'winston-transport';

/**
 * Logger
 * @description 日志类，封装了winstion日志
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年03月05日 11:20:13
 * @version 2.0.5
 */
export class Logger {

  // 日志实例（单例）
  private static instance: Logger;

  // 自定义日志格式
  private static customFormat = {
    time: format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
    align: format.align(),
    messge: format.printf((info) => `${info.level}: ${info.timestamp} ${info.message}`),
  };

  // 自定义日志配置
  private static customCofing: TransportStream[] = [
    new transports.Console({
      level: 'info',
    }),
  ];

  /**
   * 获取日志实例
   * @param option 自定义的日志选项
   * @returns 日志实例
   */
  public static getInstance(option?: ILoggerOption) {
    // 实列不存在或者传入了参数，都创建一个新的实例
    if (!Logger.instance || option) {
      if (option) {
        Logger.customFormat.messge = format.printf((info) => option.formatFnc({
          level: info.level,
          message: info.message,
          timeStr: info.timestamp,
        }));
        Logger.customCofing = option.fileConfigs.map((config) => new transports.File({
          level: config.level,
          filename: config.path,
        }));
        if (option.consoleConfig.enable) {
          Logger.customCofing.push(new transports.Console({
            level: option.consoleConfig.level,
          }));
        }
      }
      Logger.instance = new Logger({
        format: format.combine(...Object.values(Logger.customFormat)),
        transports: Logger.customCofing,
      });
    }
    return Logger.instance;
  }

  // winston日志实例
  private logger: _Logger;

  /**
   * 构造方法
   * @param option 日志选项
   */
  constructor(option: LoggerOptions) {
    this.logger = createLogger(option);
  }

  /**
   * debug日志
   * @param message 日志信息
   * @param meta 其他元素
   * @returns 日志实例
   */
  public debug(message: string, ...meta: any[]) {
    this.logger.debug(message, ...meta);
    return this;
  }

  /**
   * info日志
   * @param message 日志信息
   * @param meta 其他元素
   * @returns 日志实例
   */
  public info(message: string, ...meta: any[]) {
    this.logger.info(message, ...meta);
    return this;
  }

  /**
   * warn日志
   * @param message 日志信息
   * @param meta 其他元素
   * @returns 日志实例
   */
  public warn(message: string, ...meta: any[]) {
    this.logger.warn(message, ...meta);
    return this;
  }

  /**
   * error日志
   * @param message 日志信息
   * @param meta 其他元素
   * @returns 日志实例
   */
  public error(message: string, ...meta: any[]) {
    this.logger.error(message, ...meta);
    return this;
  }

}
