import { getInput } from "./inputUtil";

const input = getInput(6);

const lines = input.split("\n");

const grid: string[][] = lines.map((line) =>
    line.split("").filter((s) => s.length > 0)
);

let password = 0;
let operands = [] as number[];

for (let x = grid[0].length - 1; x >= 0; x--) {
    let columnNumber = "";

    // Skip the operation row
    for (let y = 0; y < grid.length - 1; y++) {
        if (grid[y][x] !== " ") {
            columnNumber += grid[y][x];
        }
    }

    if (columnNumber.length > 0) {
        operands.push(parseInt(columnNumber));
    }

    if (grid[grid.length - 1][x] === " ") { 
        continue;
    }

    const operation = grid[grid.length - 1][x];


    const result = operands.reduce(
        (acc, operand) => {
            if (operation === "+") {
                acc += operand;
            } else {
                acc *= operand;
            }
            return acc;
        },
        operation === "+" ? 0 : 1
    );

    password += result;

    operands = [];
}

console.log(password);
