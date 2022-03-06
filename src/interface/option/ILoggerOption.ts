import { IOption } from '../IOption';

// 日志信息接口
export interface LogMsg{
  level: string;
  timeStr: string;
  message: string;
}

// 日志文件输出配置
export interface FileConfig{
  path: string;
  level: string;
}

// 日志控制台输出配置
export interface ConsoleConfig{
  enable: boolean;
  level: string;
}

// 日志格式化方法
export type FormatFnction = (logMsg: LogMsg)=>string;

/**
 * ILoggerOption
 * @description 日志选项接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年03月05日 14:14:03
 * @version 2.0.5
 */
export interface ILoggerOption extends IOption {
  formatFnc: FormatFnction;
  fileConfigs: FileConfig[];
  consoleConfig: ConsoleConfig;
}
