import isNumber from 'lodash/isNumber';
import last from 'lodash/last';

export interface nearestParams {
  items: number[]; // 一组数字
  target: number; // 指定数字
  direction?: -1 | 1; // 是否增减，-1减，1增
  threshold?: number | string; // 触发阀值，可以是百分之'50%',也可以是具体的数字
}

/**
 * 查找一组数字当中指定数字的区间，根据增减和阀值规则得到最接近的数字
 * 可用于swipe-cell、swiper、slider、pick-view等滑动释放后自动调整位置的判断
 */
export default function nearest(params: nearestParams) {
  const { target, direction } = params;
  let { items, threshold = '50%' } = params;
  items = params.items.sort((a, b) => a - b);
  const smallerIndex = items.findIndex((_, index) => target <= items[index + 1]);
  const largerIndex = smallerIndex + 1;
  const smallerItem = items[smallerIndex];
  const largerItem = items[largerIndex];
  if (smallerItem === target) return target;
  if (smallerIndex === -1) return items[0];
  if (smallerIndex === items.length - 1) return last(items);
  if (![-1, 1].includes(direction)) {
    return largerItem - target >= target - smallerItem ? smallerItem : largerItem;
  }
  if (!isNumber(threshold)) {
    threshold = (largerItem - smallerItem) * (parseFloat(threshold) / 100);
  }
  if (direction === 1) {
    return target - smallerItem >= threshold ? largerItem : smallerItem;
  }
  return largerItem - target >= threshold ? smallerItem : largerItem;
}
