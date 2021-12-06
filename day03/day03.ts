
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

function part2(inpt: string[]) : number {
    let gamma: string = ""
    let epsilon: string = ""
    let o2 = inpt.map(x => Object.assign([], x))
    let co2 = inpt.map(x => Object.assign([], x))
    for (let i = 0; i < inpt[0].length; i++){
        if (o2.length > 1) {
            let tmp = o2.map(index => index[i]).join()
            let counted = count(tmp)
            if (counted['0'] > counted['1']) {
                o2 = o2.filter(line => line[i] == "0")
            }
            else {
                o2 = o2.filter(line => line[i] == "1")
            }
        }
        if (co2.length > 1) {
            let tmp = co2.map(index => index[i]).join()
            let counted = count(tmp)
            if (counted['0'] > counted['1']) {
                co2 = co2.filter(line => line[i] == "1")
            }
            else {
                co2 = co2.filter(line => line[i] == "0")
            }
        }
    }

    let o2_val = parseInt(o2[0].join(""), 2)
    let co2_val = parseInt(co2[0].join(""), 2)
    return o2_val * co2_val
}

console.log(part2(lines))