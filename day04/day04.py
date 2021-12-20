import numpy as np

def findWinner(boards, truthboards, numbers):
    for n in numbers:
        for index, b in enumerate(boards):
            target_index = np.where(b == n)
            truthboards[index][target_index] = True
            winner = np.any(np.all(truthboards[index], axis=0)) or np.any(np.all(truthboards[index], axis=1))
            if winner:
                return boards[index], truthboards[index], n
    print("no winner :(")

def findLoser(boards, truthboards, numbers):
    for n in numbers:
        flagged = []
        for index, b in enumerate(boards):
            target_index = np.where(b == n)
            truthboards[index][target_index] = True
            winner = np.any(np.all(truthboards[index], axis=0)) or np.any(np.all(truthboards[index], axis=1))
            if winner:
                if len(boards) == 1:
                    return boards[0], truthboards[0], n
                flagged.append(index)
        flagged.reverse()
        for e in flagged:
            boards.pop(e)
            truthboards.pop(e)
        print(f"{len(boards)} boards left")

    print("no winner :(")

if __name__ == "__main__":
    with open("day04/input04.txt") as fp:
        lines = fp.read().split("\n")

    numbers = map(int, lines[0].split(","))
    boards = []

    for i in range(2, len(lines), 6):
        tmp_board = [[int(a) for a in line.split()] for line in lines[i:i+5]]
        boards.append(np.array(tmp_board, dtype=int))

    tmp_truthboard = np.zeros((5, 5), dtype=bool)
    truthboards = []
    for i in range(len(boards)):
        truthboards.append(tmp_truthboard.copy())

    a, b, c = findLoser(boards, truthboards, numbers)
    print(np.sum(a[~b]) * c)



