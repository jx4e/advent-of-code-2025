import { getInput } from "./inputUtil";

const input = getInput(5);

const lines = input.split("\n");

let splitLine = -1;
for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
        splitLine = i;
        break;
    }
}

const ranges: { start: number; end: number }[] = lines
    .slice(0, splitLine)
    .map((line) => {
        const [start, end] = line.split("-");
        return { start: parseInt(start), end: parseInt(end) };
    });

const ids: number[] = lines.slice(splitLine + 1).map((line) => parseInt(line));

let fresh = 0;

ids.forEach((id) => { 
    for (const range of ranges) {
        if (id >= range.start && id <= range.end) {
            fresh++;
            break;
        }
    }
});

console.log(fresh);

function inRange(id: number, range: { start: number, end: number }): boolean {
    return id >= range.start && id <= range.end;
}

function overlaps(range1: { start: number, end: number }, range2: { start: number, end: number }): boolean {
    return inRange(range1.start, range2) || inRange(range1.end, range2) || inRange(range2.start, range1) || inRange(range2.end, range1);
}

function merge(range1: { start: number, end: number }, range2: { start: number, end: number }): { start: number, end: number } { 
    return { start: Math.min(range1.start, range2.start), end: Math.max(range1.end, range2.end) };
}

const merged = ranges.reduce((acc, range, index) => {
    for (let i = acc.length - 1; i >= 0; i--) {
        const mergedRange = acc[i];
        if (overlaps(range, mergedRange)) {
            range = merge(range, mergedRange);
            acc.splice(i, 1);
        }
    }

    acc.push(range);

    return acc;
}, [] as { start: number; end: number }[]);

const totalFresh = merged.reduce((acc, range) => acc + range.end - range.start + 1, 0);

console.log(totalFresh);