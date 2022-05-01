import { CoreModeEnum } from '@core';
import { BriskOption } from '@interface/BriskOption';

/**
 * CoreOption
 * @description 核心类选项
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 */
export interface CoreOption extends BriskOption{
  isDebug?: boolean;
  model?: CoreModeEnum;
}
