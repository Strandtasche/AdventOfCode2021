import numpy as np

def apply_step(algorithm, group):

    result = np.pad(group, 1, 'constant', constant_values=False)
    print(result.astype(int))

    for i in range(group.shape[0]):
        for j in range(group.shape[1]):
            partial = result[i:i+3, j:j+3]
            parsed = int("".join(np.char.mod("%d", partial.flatten())), 2)
            if i == 0 and j == 0:
                print(partial.astype(int))
                print(parsed)
            result[i+1, j+1] = algorithm[parsed] == "#"

    return result


if __name__ == "__main__":
    with open("day20/input20-test.txt") as fp:
        lines = fp.read().split("\n")

    algo = lines[0]

    pixels = np.zeros(shape=(len(lines[2:]), len(lines[2])), dtype=bool)
    for i, line in enumerate(lines[2:]):
        pixels[i, :] = list(map(lambda x: x == "#", list(line)))

    newStep = apply_step(algorithm=algo, group=pixels)
    print(newStep.astype(int))

