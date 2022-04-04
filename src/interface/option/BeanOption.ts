import { BriskOption } from '@interface/BriskOption';

/**
 * BeanOption
 * @description 组件参数接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年02月02日 21:27:03
 * @version 2.0.4
 */
export interface BeanOption extends BriskOption {
  // 组件域
  region?: Symbol;
  // 组件名称，默认使用类名的小驼峰
  name?: string;
}
