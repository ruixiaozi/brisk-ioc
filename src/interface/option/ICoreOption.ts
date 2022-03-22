import { CoreModeEnum } from '@core';
import { IOption } from '@interface/IOption';

/**
 * ICoreOption
 * @description 核心类选项
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年03月20日 20:31:25
 * @version 3.0.1
 */
export interface ICoreOption extends IOption{
  isDebug?: boolean;
  model?: CoreModeEnum;
}
