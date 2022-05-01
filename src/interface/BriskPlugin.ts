import { BriskOption } from '@interface/BriskOption';
import { Core } from '@core';

/**
 * BriskPlugin
 * @description 插件接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @deprecated 弃用3.0.7, {@link register}
 */
export interface BriskPlugin {
  name?: string;
  install(core: Core, option?: BriskOption): void;
}
