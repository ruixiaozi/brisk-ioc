import { ILoggerOption, LogMsg } from './../interface/option/ILoggerOption';
import { createLogger, format, transports, Logger as _Logger, LoggerOptions } from 'winston';
import 'winston-daily-rotate-file';
import TransportStream from 'winston-transport';
import { Key } from '../typeDeclare';

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
  private static instances: Map<Key, Logger> = new Map<Key, Logger>();

  // 必须要开启debug，debug才有效
  public static isDebug = false;

  // 自定义日志格式
  private static customFormat = {
    time: format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    align: format.align(),
    color: format.colorize(),
  };

  private static formatFnc = (logMsg: LogMsg) => `[${logMsg.level}]: ${logMsg.timeStr} [${logMsg.region}]${logMsg.message}`;

  // 自定义日志配置, 不配置则只有console
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
  public static getInstance(region?: Key) {
    const _region = region || 'global';
    const option = {
      format: format.combine(
        ...Object.values(Logger.customFormat),
        format.printf((info) => Logger.formatFnc({
          level: info.level,
          message: info.message,
          timeStr: info.timestamp,
          region: _region.toString(),
        })),
      ),
      transports: Logger.customCofing,
    };
    let instance = Logger.instances.get(_region);
    if (instance) {
      instance.configure(option);
    } else {
      instance = new Logger(option);
      Logger.instances.set(_region, instance);
    }
    instance.region = _region.toString();
    return instance;
  }

  public static config(option: ILoggerOption) {
    Logger.formatFnc = option.formatFnc;
    if (option.isMultiFile) {
      Logger.customCofing = option.fileConfigs.map((config) => new transports.DailyRotateFile({
        level: config.level,
        filename: config.path,
        datePattern: config.datePattern ?? 'YYYY-MM-DD',
        // true
        zippedArchive: config.zippedArchive ?? true,
        // '20m'
        maxSize: config.maxSize ?? '20m',
        // '30d'
        maxFiles: config.maxFiles ?? '30d',
      }));
    } else {
      Logger.customCofing = option.fileConfigs.map((config) => new transports.File({
        level: config.level,
        filename: config.path,
      }));
    }

    if (option.consoleConfig.enable) {
      Logger.customCofing.push(new transports.Console({
        level: option.consoleConfig.level,
      }));
    }

    // 默认关闭debug
    Logger.isDebug = option.isDebug || false;

    for (let [, instance] of Logger.instances) {
      instance.configure({
        format: format.combine(
          ...Object.values(Logger.customFormat),
          format.printf((info) => Logger.formatFnc({
            level: info.level,
            message: info.message,
            timeStr: info.timestamp,
            region: instance.region,
          })),
        ),
        transports: Logger.customCofing,
      });
    }
  }

  // winston日志实例
  private logger: _Logger;

  private region?: string;

  /**
   * 构造方法
   * @param option 日志选项
   */
  constructor(option: LoggerOptions) {
    this.logger = createLogger(option);
  }

  /**
   * 重新配置
   * @param option 日志选项
   */
  public configure(option: LoggerOptions) {
    this.logger.configure(option);
  }


  /**
   * debug日志
   * @param message 日志信息
   * @param meta 其他元素
   * @returns 日志实例
   */
  public debug(message: string, ...meta: any[]) {
    Logger.isDebug && this.logger.debug(message, ...meta);
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
