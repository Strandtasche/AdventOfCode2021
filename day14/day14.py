from collections import Counter
from collections import defaultdict

def part1(lines):
    inpt = lines[0]

    replacements_raw = map(lambda x: x.split(" -> "), lines[2:])
    replacements = {x[0]: x[1] for x in replacements_raw}

    for i in range(10):
        # print(f"iteration {i}")
        inserts = 0
        returnval = list(inpt)
        for i in range(len(inpt) -1):
            if inpt[i:i+2] in replacements.keys():
                returnval.insert(i+inserts+1, replacements[inpt[i:i+2]])
                inserts += 1
        inpt = "".join(returnval)


    print(len(inpt))
    # max_key = max(list(inpt), key=list(inpt).count)
    # max_count = list(inpt).count(max_key)
    # min_key = min(list(inpt), key=list(inpt).count)
    # min_count = list(inpt).count(min_key)
    # print(f"max: {max_key} _ {max_count}")
    # print(f"min: {min_key} _ {min_count}")
    c = Counter(inpt)
    ordered = c.most_common()
    max_count = ordered[0][1]
    min_count = ordered[-1][1]

    return max_count - min_count

def part2(lines):
    inpt = lines[0]

    replacements_raw = map(lambda x: x.split(" -> "), lines[2:])
    replacements = {x[0]: x[1] for x in replacements_raw}
    parts = defaultdict(int)

    for i in range(len(inpt) - 1):
        parts[inpt[i:i+2]] += 1

    for i in range(40):
        # print(f"iteration {i}")
        new_parts = defaultdict(int)
        for r in replacements:
            new_parts[r[0] + replacements[r]] += parts[r]
            new_parts[replacements[r] + r[1]] += parts[r]

        parts = new_parts

    counter = defaultdict(int)
    for r in parts:
        counter[r[0]] += parts[r]

    # SNEAKY LAST ELEMENT
    counter[inpt[-1]] += 1

    max_key = max(counter, key=counter.get)
    min_key = min(counter, key=counter.get)

    return counter[max_key] - counter[min_key]

if __name__ == "__main__":
    with open("day14/input14.txt") as fp:
        lines = fp.read().split("\n")

    # print(part1(lines))
    print(part2(lines))