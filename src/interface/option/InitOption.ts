import { BriskOption } from '@interface/BriskOption';

/**
 * InitOption
 * @description 初始化方法选项接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年02月02日 21:27:26
 * @version 2.0.4
 */
export interface InitOption extends BriskOption {
  // 优先级，默认值10，值越小优先级越高
  priority: number;
}
