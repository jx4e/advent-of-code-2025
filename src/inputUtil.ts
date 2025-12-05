import fs from 'fs';

export function getInput(day: number): string {
    const input = fs.readFileSync(`./inputs/day${day}.txt`, 'utf8');
    return input;
}