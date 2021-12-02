
import { InputType } from 'zlib';
import { readFileLines } from '../utils';



export const parseInput = (inputFile: string): [string, number][] =>
    readFileLines(inputFile)
    .map(elem => [elem.split(" ")[0], elem.split(" ")[1]])
    .map(tuple => [tuple[0], Number(tuple[1])])


const lines: [string, number][] = parseInput(`${__dirname}/input02-p1.txt`);


function part1(inpt: [string, number][]): number {
    let hori: number = 0
    let verti: number = 0

    for (const [i, value] of inpt) {
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

function part2(inpt: [string, number][]): number {
    let hori: number = 0
    let verti: number = 0
    let aim = 0

    for (const [i, value] of inpt) {
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