
import { InputType } from 'zlib';
import { readFileLines } from '../utils';



export const parseInput = (inputFile: string): [string, string][] => readFileLines(inputFile).map(elem => [elem.split(" ")[0], elem.split(" ")[1]])


const lines: [string, string][] = parseInput(`${__dirname}/input02-p1.txt`);


function part1(inpt: [string, string][]): number {
    let hori: number = 0
    let verti: number = 0

    for (const [i, j] of inpt) {
        let value: number = Number(j)
        if (i == "forward") {
            hori += value
        }
        else if ( i == "down") {
            verti += value
        }
        else if (i == "up") {
            verti -= value
        }
    }

    return hori * verti
}

function part2(inpt: [string, string][]): number {
    let hori: number = 0
    let verti: number = 0
    let aim = 0

    for (const [i, j] of inpt) {
        let value: number = Number(j)
        if (i == "forward") {
            hori += value
            verti += value * aim
        }
        else if ( i == "down") {
            aim += value
        }
        else if (i == "up") {
            aim -= value
        }
    }

    return hori * verti
}





console.log(part1(lines))
console.log(part2(lines))