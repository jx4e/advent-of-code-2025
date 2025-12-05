import { getInput } from "./inputUtil";

const input = getInput(3);

const lines = input.split("\n");

const banks: number[][] = lines.map((line) => line.split("").map(Number));

let password = 0;

function getLargestJoltage(bank: number[]): number {
    const batteries = 12;

    const largestJoltages = Array(batteries).fill(-1);

    for (let i = 0; i < bank.length; i++) {
        for (let j = 0; j < batteries; j++) {
            if (largestJoltages[j] < largestJoltages[j + 1]) {
                largestJoltages.splice(j, 1);
                largestJoltages.push(bank[i]);
                break;
            }
        }

        if (largestJoltages[largestJoltages.length - 1] < bank[i]) {
            largestJoltages.pop();
            largestJoltages.push(bank[i]);
        }
    }

    return largestJoltages.reduce(
        (acc, joltage, index) =>
            acc + joltage * Math.pow(10, batteries - index - 1),
        0
    );
}

banks.forEach((bank) => {
    const largestJoltage = getLargestJoltage(bank);
    password += largestJoltage;
});

console.log(password);
