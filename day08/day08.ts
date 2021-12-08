import { readFileLines } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


export const parseInput = (inputFile: string): string[][] => readFileLines(inputFile).map(x => x.split("|")[1].split(" "))

const mapping: number[] = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

const lines_part1: string[][] = parseInput(`${__dirname}/input08-p1.txt`);


function part1_naiv(inpt: string[][]) : number {
    return inpt.map(line => line.filter(x => [mapping[1], mapping[4], mapping[7], mapping[8]].includes(x.length)).length).reduce((a,b) => a + b, 0)
}

console.log(part1_naiv(lines_part1))