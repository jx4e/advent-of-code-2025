import { getInput } from "./inputUtil";

const input = getInput(1);

type Rotation = {
    direction: string;
    distance: number;
};

const rotations: Rotation[] = input.split("\n").map((line) => {
    const direction = line[0];
    const distance = parseInt(line.slice(1));
    return { direction, distance };
});

let start = 50;
let password = 0;

rotations.forEach((rotation) => {
    for (let i = 0; i < rotation.distance; i++) {
        if (rotation.direction == "L") {
            start -= 1;

            if (start < 0) {
                start = 99;
            }
        } else if (rotation.direction == "R") {
            start += 1;

            if (start > 99) {
                start = 0;
            }
        }

        if (start === 0) {
            password++;
        }
    }
});

console.log(password);
