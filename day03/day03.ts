
import { InputType } from 'zlib';
import { readFileLines } from '../utils';
import { count } from '../utils';



export const parseInput = (inputFile: string): string[] => readFileLines(inputFile)


const lines: string[] = parseInput(`${__dirname}/input03-p1.txt`);




function part1(inpt: string[]) : number {
    let gamma: string = ""
    let epsilon: string = ""
    for (let i = 0; i < inpt[0].length; i++){
        let tmp = inpt.map(index => index[i]).join()
        let counted = count(tmp)
        if (counted['0'] > counted['1']) {
            gamma += '0'
            epsilon += '1'
        }
        else {
            gamma += '1'
            epsilon += '0'
        }
    }

    return Number("0b" + gamma) * Number("0b" + epsilon)
}

console.log(part1(lines))