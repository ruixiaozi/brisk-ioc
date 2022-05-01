import { BriskOption } from '@interface/BriskOption';

/**
 * InitOption
 * @description 初始化方法选项接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 */
export interface InitOption extends BriskOption {
  // 优先级，默认值10，值越小优先级越高
  priority: number;
}
