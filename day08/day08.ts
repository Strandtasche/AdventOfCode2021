import { readFileLines } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


export const parseInput = (inputFile: string): string[][][] => readFileLines(inputFile).map(x => x.split("|").map(y => y.split(" ").map(z => z.split("").sort().join(""))))

const mapping: number[] = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

const lines_part1: string[][][] = parseInput(`${__dirname}/input08-p1.txt`);


function part1_naiv(inpt: string[][][]) : number {
    return inpt.map(line => line[1].filter(x => [mapping[1], mapping[4], mapping[7], mapping[8]].includes(x.length)).length).reduce((a,b) => a + b, 0)
}

console.log(part1_naiv(lines_part1))

function intersect(inpt0: string, inpt1: string): string {
    let a = new Set(inpt0.split(''))
    let b = new Set(inpt1.split(''))
    let intersection = new Set(
        [...a].filter(x => b.has(x)));

        return Array.from(intersection.values()).sort().join("");

}

function is_pattern_adv(pattern: string[], length: number, overlapp_string: string, overlapp_len: number): string {
    let subset: string[] = pattern.filter(x => x.length == length)

    subset = subset.filter(x => intersect(x, overlapp_string).length == overlapp_len)

    if (subset.length != 1) {
        console.log("WRONG!")
        return "-1"
    }

    return subset[0]
}

function solve_individual_line (inpt: string[][]): number {
    let solution: string[] = [...new Array(10)].map(() => "");

    let input_pattern : string[] = inpt[0]

    let indexes : number[]= []
    for (let i_v = 0; i_v < input_pattern.length; i_v++) {
        let p = input_pattern[i_v]
        for (let i of [1, 4, 7, 8]){
            if (mapping[i] == p.length){
                solution[i] = p.split("").sort().join("")
                indexes.push(i_v)
            }
        }
    }
    for (let rms of indexes){
            input_pattern.splice(rms, 1);
    }

    solution[9]= is_pattern_adv(input_pattern, 6, solution[4], 4)
    let index = input_pattern.indexOf(solution[9], 0);
    if (index > -1) {
        input_pattern.splice(index, 1);
    }
    solution[0]= is_pattern_adv(input_pattern, 6, solution[1], 2)
    index = input_pattern.indexOf(solution[0], 0);
    if (index > -1) {
        input_pattern.splice(index, 1);
    }
    solution[6]= is_pattern_adv(input_pattern, 6, solution[1], 1)
    index = input_pattern.indexOf(solution[6], 0);
    if (index > -1) {
        input_pattern.splice(index, 1);
    }
    solution[3]= is_pattern_adv(input_pattern, 5, solution[1], 2)
    index = input_pattern.indexOf(solution[3], 0);
    if (index > -1) {
        input_pattern.splice(index, 1);
    }
    solution[2]= is_pattern_adv(input_pattern, 5, solution[4], 2)
    index = input_pattern.indexOf(solution[2], 0);
    if (index > -1) {
        input_pattern.splice(index, 1);
    }
    solution[5] = input_pattern[0]

    console.log(solution)
    console.log(input_pattern)
    return 0

}


console.log(solve_individual_line(lines_part1[0]))

