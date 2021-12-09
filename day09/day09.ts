import { readFileLines } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


export const parseInput = (inputFile: string): number[][] => readFileLines(inputFile).map(x => x.split("").map(y => Number(y)))

const mapping: number[] = [6, 2, 5, 5, 4, 5, 6, 3, 7, 6]

const lines: number[][] = parseInput(`${__dirname}/input09-p1.txt`);


function part1_naiv(inpt: number[][]): number {
    // let minima: number[] = []
    let summi = 0
    for (let x = 0; x < inpt.length; x++) {
        for (let y = 0; y < inpt[x].length; y++) {
            let local_area: [number, number][] = []
            local_area.push([ x - 1,y   ])
            local_area.push([ x    ,y- 1])
            local_area.push([ x + 1,y   ])
            local_area.push([ x    ,y+ 1])

            let values = local_area.map(([a, b]) => (0 <= a && a < inpt.length && 0 <= b && b < inpt[x].length) ? inpt[a][b] : 11)

            if (inpt[x][y] < Math.min(...values)) {
                // minima.push(inpt[x][y])
                // console.log("x: " + x + " , y: " + y)
                // console.log(inpt[x][y])
                summi += inpt[x][y] + 1
            }
        }
    }
    return summi
}

console.log(part1_naiv(lines))

