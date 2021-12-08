
import { stringify } from 'querystring';
import { InputType } from 'zlib';
import { readFile } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


export const parseInput = (inputFile: string): number[] => readFile(inputFile).split(",").map(x => Number(x))


const lines: number[] = parseInput(`${__dirname}/input07-p1.txt`);


function minDiff(inpt: number[], val: number): number {
    return inpt.map(x => Math.abs(val - x)).reduce((a,b) => a + b, 0)
}

function minDiff_p2(inpt: number[], val: number): number {
    return inpt.map(x => (Math.abs(val - x)) * (Math.abs(val -x) + 1) * 0.5).reduce((a,b) => a + b, 0)
}


function part1_naiv(inpt: number[]) : number {
    let minFuel = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < inpt.length; i++) {
        if (minDiff_p2(inpt, i) > minFuel) {
            return minFuel
        } else {
            minFuel = minDiff_p2(inpt, i)
        }
    }
    return minFuel



    // return values.length
}

console.log(part1_naiv(lines))