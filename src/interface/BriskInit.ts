/**
 * BriskInit
 * @description 初始化接口
 * @author ruixiaozi
 * @email admin@ruixiaozi.com
 * @date 2022年04月03日 01:08:52
 * @version 3.0.5
 */
export interface BriskInit {
  fn: Function;
  // 优先级，值越小优先级越高
  priority: number;
}
