import numpy as np

def apply_step(algorithm, group, outside: bool):

    result = np.pad(group, 2, 'constant', constant_values=outside)
    return_val = result.copy()

    for i in range(1, result.shape[0] - 1):
        for j in range(1, result.shape[1] - 1):
            partial = result[i-1:i+2, j-1:j+2]
            parsed = int("".join(np.char.mod("%d", partial.flatten())), 2)
            return_val[i, j] = algorithm[parsed] == "#"

    return return_val[1:-1, 1:-1]


if __name__ == "__main__":
    with open("day20/input20.txt") as fp:
        lines = fp.read().split("\n")

    algo = lines[0]

    pixels = np.zeros(shape=(len(lines[2:]), len(lines[2])), dtype=bool)
    for i, line in enumerate(lines[2:]):
        pixels[i, :] = list(map(lambda x: x == "#", list(line)))

    # algo = ["."]*512
    # algo[0] = "#"
    # algo =  "".join(algo)
    # pixels = np.ones(shape=(1,1))
    newStep = apply_step(algorithm=algo, group=pixels, outside=False)
    newStep2 = apply_step(algorithm=algo, group=newStep, outside=True)

    print(newStep2.astype(int))
    print(np.sum(newStep2))

