
mapping = {")":"(", "]":"[",  ">":"<", "}":"{"}
symbol_values_p1 = {"]":57, ")":3, ">":25137, "}":1197}
symbol_values_p2 = {"[":2, "(":1, "<":4, "{":3}

def part1(inpt: str) -> int:
    symbol_list = []
    for u in inpt:
        if u in mapping.values():
            symbol_list.append(u)
        elif u in mapping.keys():
            stack_top = symbol_list.pop()
            if stack_top != mapping.get(u):
                # print(f"expected {symbol_list[-1]} but found {u}")
                return symbol_values_p1.get(u)

    if not symbol_list:
        return 0
    else:
        # print("invalid!")
        return -1

def part2(inpt: str) -> int:
    symbol_list = []
    for u in inpt:
        if u in mapping.values():
            symbol_list.append(u)
        elif u in mapping.keys():
            stack_top = symbol_list.pop()
            if stack_top != mapping.get(u):
                # print(f"expected {symbol_list[-1]} but found {u}")
                return -1

    if not symbol_list:
        return 0
    else:
        score = 0
        for s in symbol_list[::-1]:
            score *= 5
            score += symbol_values_p2.get(s)
        return score

if __name__ == "__main__":
    with open("day10/input10-real.txt") as fp:
        lines = fp.read().split("\n")

    changes = []
    for line in lines:
        change = part2(line)
        if change > 0:
            changes.append(change)

    changes.sort()
    print(changes[int(len(changes)/2)])
