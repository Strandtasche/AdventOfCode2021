import numpy as np
np.set_printoptions(edgeitems=30, linewidth=100000)

def part1(lines: list) -> int:
    split_index = lines.index("")
    sheet_values = lines[:split_index]
    values = lines[split_index+1:]
    sheet_values_mapped = list(map(lambda x: x.split(","), sheet_values))
    # max_x = int(max(sheet_values_mapped, key=lambda item: int(item[0]))[0])
    # max_y = int(max(sheet_values_mapped, key=lambda item: int(item[1]))[1])

    cutaxis, rawindex = values[0].split()[2].split("=")
    index = int(rawindex)
    if cutaxis == "y":
        max_y = 2*index+1
        max_x = 2*int(values[1].split()[2].split("=")[1])+1
    else:
        max_x = 2*index+1
        max_y = 2*int(values[1].split()[2].split("=")[1])+1


    sheet = np.zeros(shape=(max_y, max_x))
    for i in sheet_values_mapped:
        sheet[int(i[1]), int(i[0])] = True


    orders = map(lambda x: x.split()[2].split("="), values)

    for o in orders:
        cutaxis = o[0]
        index = int(o[1])
        if cutaxis == "y":
            max_y = max_y//2
        else:
            max_x = max_x//2
        # newrows = np.zeroes(shape=(max_x + 1, max_y + 1), dtype=bool)

        if cutaxis == "y":
            sheet = np.logical_or(sheet[:max_y, :], np.flipud(sheet[max_y+1:, :]))
        else:
            sheet = np.logical_or(sheet[:, :max_x], np.fliplr(sheet[:, max_x+1:]))

    print(sheet.astype(int))
    return np.sum(sheet)



if __name__ == "__main__":
    with open("day13/input13.txt") as fp:
        lines = fp.read().split("\n")

    print(part1(lines))
    # print(part2(lines))