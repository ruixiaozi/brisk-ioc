import { IBeanOption } from '@interface';

/**
 * BeanOption
 * @description 组件选项
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年01月16日 19:22:00
 * @version 2.0.0
 */
export class BeanOption implements IBeanOption {

  /**
   * 构造器
   * @param region 组件域
   * @param name 组件名称，默认使用类名的小驼峰
   */
  constructor(public region?: Symbol, public name?: string) {}

}

