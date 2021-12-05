
// util functions borrowed from https://github.com/andomain/advent-of-code/blob/master/2020/utils/index.ts

const fs = require('fs');

export const readFile = (filePath: string, enc = 'utf-8'): string => fs.readFileSync(filePath, enc).trim();
export const readFileLines = (filePath: string, enc = 'utf-8'): string[] => readFile(filePath, enc).split('\n');

export const numBetween = (num: number, { min = 0, max = Number.MAX_SAFE_INTEGER } = {}) => {
  return num <= max && num >= min;
}

export const logicalXor = (a: boolean, b: boolean): boolean => {
  return (a && !b) || (!a && b);
}

export const splitByEmptyLine = (filePath: string): string[][] => readFile(filePath)
  .replace(/\n\r/g, "\n")
  .replace(/\r/g, "\n")
  .split(/\n{2,}/g)
  .map((lines) => lines.split('\n'));

export const count = (inpt: string): { [key: string]: number } => {
  const counts = {};

  for (let i = 0; i < inpt.length; i++) {
    let num = inpt[i]
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }

  return counts;
}

export const range = (low: number, high: number): number[] => {
    let val = Array.from(Array(Math.max(low, high) - Math.min(low, high) + 1).keys()).map(x => x + Math.min(low, high));
    return low < high ? val : val.reverse()
}
