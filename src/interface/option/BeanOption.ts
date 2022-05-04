import { BriskOption } from '@interface/BriskOption';

/**
 * BeanOption
 * @description 组件参数接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 */
export interface BeanOption extends BriskOption {
  // 组件域
  region?: Symbol;
  // 组件名称，默认使用类名的小驼峰
  name?: string;
}
