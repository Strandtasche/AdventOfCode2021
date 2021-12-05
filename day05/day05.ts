
import { stringify } from 'querystring';
import { InputType } from 'zlib';
import { readFileLines } from '../utils';
import { count } from '../utils';
import { range } from '../utils';


type inptLine = {
    x1: number;
    x2: number;
    y1: number;
    y2: number;

}

export const parseInput = (inputFile: string): inptLine[] => readFileLines(inputFile)
    .map(row => row.match(/\d+/g)).map(result => {return {x1: Number(result[0]), y1: Number(result[1]), x2: Number(result[2]), y2: Number(result[3])}})


const lines: inptLine[] = parseInput(`${__dirname}/input05-p1.txt`);
const filteredLines: inptLine[] = lines.filter(elem => elem.x1 == elem.x2 || elem.y1 == elem.y2)


function mapHelper (h1: number, h2: number): string {
    return String(h1) + "," + String(h2)
}


function part2(inpt: inptLine[]) : number {
    let lineMap =  new Map<string, number>();

    for (let line of inpt) {
        if (line.x1 == line.x2) {
            for (let index of range(line.y1, line.y2)){
                lineMap.set(mapHelper(line.x1,index), lineMap.has(mapHelper(line.x1, index)) ? lineMap.get(mapHelper(line.x1, index)) + 1 : 1);
            }
        } else if (line.y1 == line.y2) {
            for (let index of range(line.x1, line.x2)){
                lineMap.set(mapHelper(index, line.y1), lineMap.has(mapHelper(index, line.y1)) ? lineMap.get(mapHelper(index, line.y1)) + 1: 1);
            }
        // Added for part 2
        } else {
            let x_range = range(line.x1, line.x2)
            let y_range = range(line.y1, line.y2)
            for (let index in x_range){
                    lineMap.set(mapHelper(x_range[index], y_range[index]), lineMap.has(mapHelper(x_range[index], y_range[index])) ? lineMap.get(mapHelper(x_range[index], y_range[index])) + 1: 1);
            }
        }
    }

    // console.log(lineMap)
    let counter = 0;
    for (let v of lineMap.values()){
        if (v > 1) {
            counter += 1
        }
    }

    return counter
}
console.log(part2(filteredLines))
console.log(part2(lines))
// const regex = /(\d*),(\d*) -> (\d*),(\d*)/g
// const regex = /\d+/g
// const found = '0,900 -> 5,9'.match(regex);

// console.log(range(4,0))
// console.log(found)
// console.log("fuck")