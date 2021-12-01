import { InputType } from 'zlib';
import { readFileLines } from '../utils';



export const parseInput = (inputFile: string): number[] => readFileLines(inputFile)
  .map(Number)


const lines: number[] = parseInput(`${__dirname}/input01-p1.txt`);

console.log(lines.length)


function part1(inpt: number[]): number {
    let counter: number = 0;

    for (let i = 1; i < inpt.length; i++) {
        if (inpt[i-1] < inpt[i]) {
            counter += 1
        }
    }
    return counter
}

function part2(inpt: number[]): number {
    let counter: number = 0;

    for (let i = 3; i < inpt.length; i++) {
        let val1 = inpt[i-3] + inpt[i - 2] + inpt[i-1]
        let val2 = inpt[i-2] + inpt[i - 1] + inpt[i]
        if (val1 < val2) {
            counter += 1
        }
    }

    return counter

}

console.log(part1(lines))
console.log(part2(lines))