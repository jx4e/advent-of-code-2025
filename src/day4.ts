import { getInput } from "./inputUtil";

const input = getInput(4);

const lines = input.split("\n");

const grid: string[][] = lines.map((line) => line.split(""));

function containsPaper(x: number, y: number): boolean {
    if (x < 0 || x >= grid[0].length || y < 0 || y >= grid.length) {
        return false;
    }

    return grid[y][x] === "@";
}

let totalRolls = 0;
let rolls = -1;

while (rolls !== 0) { 
    rolls = 0;
    
    for (let x = 0; x < grid[0].length; x++) {
        for (let y = 0; y < grid.length; y++) {
            if (containsPaper(x, y)) {
                let adjacent = 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }

                        if (containsPaper(x + i, y + j)) {
                            adjacent++;
                        }
                    }
                }

                if (adjacent < 4) {
                    grid[y][x] = "x";
                    rolls++;
                }
            }
        }
    }

    totalRolls += rolls;
}

console.log(totalRolls);