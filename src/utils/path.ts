import { roundPoint } from './number';

export const createCurves = (x1: number, y1: number, x2: number, y2: number): string =>
  ` C${roundPoint((x2 + x1) / 2)},${y1} ${roundPoint((x2 + x1) / 2)},${y2} ${x2},${y2}`;

export const createVerticalCurves = (x1: number, y1: number, x2: number, y2: number): string =>
  ` C${x1},${roundPoint((y2 + y1) / 2)} ${x2},${roundPoint((y2 + y1) / 2)} ${x2},${y2}`;

/**
 * Creates a path for funnel segment
 * A funnel segment is drawn in a clockwise direction.
 */
export const createPath = (_index: number, X: number[], Y: number[], YNext: number[]): string => {
  let str = `M${X[0]},${Y[0]}`;

  for (let i = 0; i < X.length - 1; i++) {
    str += createCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
  }

  str += ` L${[...X].pop()},${[...YNext].pop()}`;

  for (let i = X.length - 1; i > 0; i--) {
    str += createCurves(X[i], YNext[i], X[i - 1], YNext[i - 1]);
  }

  str += ' Z';
  return str;
};

/**
 * Creates a vertical path (counter-clockwise)
 */
export const createVerticalPath = (_index: number, X: number[], Y: number[], YNext: number[]): string => {
  let str = `M${X[0]},${Y[0]}`;

  for (let i = 0; i < Y.length - 1; i++) {
    str += createVerticalCurves(X[i], Y[i], X[i + 1], Y[i + 1]);
  }

  str += ` L${[...YNext].pop()},${[...Y].pop()}`;

  for (let i = Y.length - 1; i > 0; i--) {
    str += createVerticalCurves(YNext[i], Y[i], YNext[i - 1], Y[i - 1]);
  }

  str += ' Z';
  return str;
};