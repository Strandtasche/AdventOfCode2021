
import { stringify } from 'querystring';
import { InputType } from 'zlib';
import { readFile } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


export const parseInput = (inputFile: string): number[] => readFile(inputFile).split(",").map(x => Number(x))


const lines: number[] = parseInput(`${__dirname}/input06-p1.txt`);


function part1_naiv(inpt: number[]) : number {

    let values: number[] = inpt.map(x => Object.assign([], x))

    for (let i = 0; i < 80; i++) {
        for (let index in values) {
            if (values[index] == 0) {
                values.push(9)
                values[index] = 7
            }
        }
        values = values.map(x => x - 1)
        // console.log(values)
    }

    return values.length
}

function part1_clever(inpt: number[]): number {
    let state: number[] = Array(9).fill(0)


    for (let elem in inpt) {
        state[inpt[elem]] += 1
    }

    for (let d = 0; d < 256; d++) {
        let tmp = state[0]
        for (let i = 1; i < state.length; i++) {
            state[i-1] = state[i]
        }
        state[state.length] = 0
        state[6] += tmp
        state[8] += tmp
    }

    // console.log(state)
    return state.reduce((a,b) => a + b, 0)
}

console.log(part1_naiv(lines))
console.log(part1_clever(lines))