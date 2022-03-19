export default function nearest(numList: number[], target: number) {
  return numList.reduce((acc, item) => (Math.abs(acc - target) < Math.abs(item - target) ? acc : item));
}
