import numpy as np
from scipy import sparse
import re

if __name__ == "__main__":
    with open("day22/input22-test.txt") as fp:
        lines = fp.read().split("\n")

    min_x, max_x, min_y, max_y, min_z, max_z = map(int, re.findall(r"-?\d+", lines[0]))
    for line in lines:
        low_x, high_x, low_y, high_y, low_z, high_z = map(int, re.findall(r"-?\d+", line))

        if low_x < min_x:
            min_x = low_x
        if high_x > max_x:
            max_x = high_x
        if low_y < min_y:
            min_y = low_y
        if high_y > max_y:
            max_y = high_y
        if low_z < min_z:
            min_z = low_z
        if high_z > max_z:
            max_z = high_z

        width_x = max_x - min_x + 1
        width_y = max_y - min_y + 1
        width_z = max_z - min_z + 1

    values = sparse.coo_matrix(shape=(width_x, width_y, width_z), dtype=bool)

    for line in lines:
        low_x, high_x, low_y, high_y, low_z, high_z = map(int, re.findall(r"-?\d+", line))
        values[low_x - min_x:high_x - min_x + 1, low_y - min_y:high_y - min_y + 1, low_z - min_z:high_z - min_z + 1] = line[1] == "n"

    # print(np.sum(values[-50 - min_x:50-min_x, -50-min_y:50-min_y, -50-min_z:50-min_z]))
    print(np.sum(values))



