import { IInitOption } from './../../interface/option/IInitOption';

/**
 * InitOption
 * @description 初始化选项
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年01月16日 15:04:27
 * @version 2.0.0
 */
export class InitOption implements IInitOption {

  /**
   * 构造方法
   * @param priority 优先级，默认值10，值越小优先级越高
   */
  constructor(public priority: number = 10) {}

}

