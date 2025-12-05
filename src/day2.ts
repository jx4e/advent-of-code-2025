import { getInput } from "./inputUtil";

const input = getInput(2);

type Range = {
    start: number;
    end: number;
};

const pairs: Range[] = input.split(",").map((line) => {
    const [start, end] = line.split("-").map(Number);
    return { start, end };
});

let password = 0;

function isInvalid(seq: string, rest: string): boolean {
    if (seq.length == rest.length) {
        return seq == rest;
    }

    if (rest.substring(0, seq.length) !== seq) {
        return false;
    }

    return isInvalid(seq, rest.slice(seq.length));
}

pairs.forEach((pair) => {
    for (let i = pair.start; i <= pair.end; i++) {
        const s = i.toString();

        for (let j = 1; j < s.length; j++) {
            const seq = s.slice(0, j);
            const rest = s.slice(j);

            if (isInvalid(seq, rest)) {
                password += i;
                break;
            }
        }
    }
});

console.log(password);
