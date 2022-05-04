/**
 * BriskInit
 * @description 初始化接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 */
export interface BriskInit {
  fn: Function;
  // 优先级，值越小优先级越高
  priority: number;
}
