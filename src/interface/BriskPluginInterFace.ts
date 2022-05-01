import { BriskOption } from '@interface/BriskOption';

/**
 * BriskPluginInterFace
 * @description 插件接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @since 3.0.7
 */
export interface BriskPluginInterFace {
  name?: string;
  install(option?: BriskOption): void;
}
