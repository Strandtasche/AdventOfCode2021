import numpy as np

with open("day11/input11-test.txt") as fp:
    lines = fp.read().split("\n")

octopusses = np.zeros(shape=(len(lines), len(lines[0])))
for i, line in enumerate(lines):
    octopusses[i, :] = list(map(int, list(line)))


def iterate(inpt: np.ndarray) -> np.ndarray:

    changes = np.zeros(shape=inpt.shape, dtype=bool)
    inpt += 1

    changed = True
    while changed:
        changed = False
        for x in range(inpt.shape[0]):
            for y in range(inpt.shape[1]):
                if inpt[x, y] > 9 and not changes[x, y]:
                    changes[x, y] = True
                    changed = True
                    # ignore 0,0 ?
                    for i, j in [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]:
                        if 0 <= x+i < inpt.shape[0] and 0 <= y+j < inpt.shape[1]:
                            inpt[x+i, y+j] += 1

    inpt[changes] = 0
    return inpt, np.sum(changes)

total_flashes = 0
for i in range(1000):
    octopusses, increase = iterate(octopusses)
    total_flashes += increase
    if np.sum(octopusses) == 0:
        print(f"All flashed in {i+1}")
        exit()
    # print(octopusses)
    # print(f"after step {i + 1}: +{increase} => {total_flashes} flashes")

print(total_flashes)