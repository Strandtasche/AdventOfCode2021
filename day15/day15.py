import numpy as np
np.set_printoptions(edgeitems=30, linewidth=100000)


def part1(inpt):
    distance = np.zeros(shape=inpt.shape)
    distance.fill(9999999)

    queue = [(0, 0)]
    distance[0, 0] = 0

    while queue:
        queue.sort(key=lambda x: distance[x[0], x[1]])
        element_x, element_y = queue.pop(0)
        if element_x == inpt.shape[0] - 1 and element_y == inpt.shape[1] - 1:
            # print(distance)
            return distance[-1, -1]

        for x, y in [(1, 0), (-1, 0), (0, -1), (0, 1)]:
            if (
                0 <= element_x + x < inpt.shape[0]
                and 0 <= element_y + y < inpt.shape[1]
            ):
                if (
                    distance[element_x, element_y] + inpt[element_x + x, element_y + y]
                    < distance[element_x + x, element_y + y]
                ):
                    distance[element_x + x, element_y + y] = (
                        distance[element_x, element_y]
                        + inpt[element_x + x, element_y + y]
                    )
                    queue.append((element_x + x, element_y + y))

def update_tiles(inpt):
    news= np.tile(inpt, (5,5))
    for j in range(1,5):
        news[:, j*inpt.shape[1]:] += 1
        news[j*inpt.shape[0]:, :] += 1

    f =np.vectorize(lambda x: x if x <= 9 else x - 9)
    return f(news)


if __name__ == "__main__":
    with open("day15/input15.txt") as fp:
        lines = fp.read().split("\n")

    chitons = np.zeros(shape=(len(lines), len(lines[0])), dtype=int)
    for i, line in enumerate(lines):
        chitons[i, :] = list(map(int, list(line)))

    new_chitons = update_tiles(chitons)

    print(part1(new_chitons))
