import { format } from 'path/posix';
import { readFileLines } from '../utils';
import { tuple_includes } from '../utils';
import { count } from '../utils';


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

function part2_9border(inpt: number[][]): number {


    let minima: [number, number][] = []
    for (let x = 0; x < inpt.length; x++) {
        for (let y = 0; y < inpt[x].length; y++) {
            let local_area: [number, number][] = []
            local_area.push([ x - 1,y   ])
            local_area.push([ x    ,y- 1])
            local_area.push([ x + 1,y   ])
            local_area.push([ x    ,y+ 1])

            let values = local_area.map(([a, b]) => (0 <= a && a < inpt.length && 0 <= b && b < inpt[x].length) ? inpt[a][b] : 11)

            if (inpt[x][y] < Math.min(...values)) {
                minima.push([x, y])
            }
        }
    }

    // console.log(minima)

    let basins: number[][] = []
    for (let i=0; i<inpt.length; i++){
        basins[i] = inpt[i].slice()
    }

    let basin_index = 0
    for (let i =0; i<inpt.length;i++){
        for (let j=0; j<inpt[i].length;j++){
            if (tuple_includes(minima, [i, j])){
                basins[i][j] = basin_index
                basin_index += 1
            }
            else{
                basins[i][j] = -1
            }
        }
    }

    for (let m of minima){
        region_growing(m[0], m[1], basins, inpt)
    }

    console.table(basins.slice(0,10).map(x => x.slice(0,10)))
    let total_count = new Map<number, number>()
    for (let i of Array.from(Array(basin_index).keys())){
        total_count.set(i, 0)
    }
    for (let x = 0; x<basins.length; x++) {
        for (let y=0; y<basins[x].length; y++){
            total_count.set(basins[x][y], total_count.get(basins[x][y]) + 1)
        }
    }
    total_count.set(-1, 0)
    // console.log(total_count)
    console.log(total_count.get(2))
    let values = Array.from(total_count.values())
    values = values.sort((a, b) => a > b ? 1 : -1)
    values = values.reverse()
    // console.log(values)

    return values[0] * values[1] * values[2]

}


function region_growing(startx: number, starty:number, field: number[][], orig: number[][]): void {
    let queue: [number, number][] = [[startx, starty]]
    let basin_index = field[startx][starty]
    while (queue.length > 0){
        let current = queue.shift()
        for (let [i, j] of [[-1,0], [1, 0], [0, 1], [0, -1]]){
            if (0 <= current[0] + i && current[0] + i < orig.length && 0 <= current[1] + j && current[1] + j < orig[current[0]].length){
                if (field[current[0] + i][current[1] + j] != basin_index && orig[current[0] + i][current[1] + j] != 9){
                    if (field[current[0]+i][current[1]+j] != -1){
                        console.log("MISTAKE!")
                    }
                    queue.push([current[0] + i, current[1] + j])
                    field[current[0] + i][current[1] + j] = basin_index
                }
            }
        }
    }
}

// console.log(part1_naiv(lines))
console.log(part2_9border(lines))

