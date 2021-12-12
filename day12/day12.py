
from collections import defaultdict


class SubterrainianCave:

    def __init__(self, special = None) -> None:
        self.graph = defaultdict(list)
        self.counter = 0
        self.special = special
        self.special_triggered = False
        self.paths = set([])

    def addEdge(self, u, v):
            self.graph[u].append(v)
            self.graph[v].append(u)

    def listAllPaths(self, s, d):
        path = []
        visited = defaultdict(bool)
        self.listAllPathsUtil(s, d, visited, path, self.special, False)


    def listAllPathsUtil(self, u, d, visited, path, special, triggered):

            if u == special and not triggered:
                triggered = True
            elif u.islower():
                visited[u]= True
            path.append(u)

            if u == d:
                self.paths.add(",".join(path))
                self.counter += 1
            else:
                for i in self.graph[u]:
                    if not visited[i]:
                        self.listAllPathsUtil(i, d, visited, path, special, triggered)

            path.pop()
            visited[u]= False


def part1(lines: list) -> int:
    cave = SubterrainianCave()
    for line in lines:
        cave.addEdge(*line.split('-'))
    cave.listAllPaths("start", "end")
    return cave.counter

def part2(lines: list) -> int:
    keys = set([])
    for line in lines:
        for k in line.split('-'):
            keys.add(k)

    keys.remove("start")
    keys.remove("end")
    total_paths = set([])

    for key in [lk for lk in keys if lk.islower()]:
        cave = SubterrainianCave(special=key)
        for line in lines:
            cave.addEdge(*line.split('-'))
        cave.listAllPaths("start", "end")
        total_paths.update(cave.paths)


    return len(total_paths)




if __name__ == "__main__":
    with open("day12/input12.txt") as fp:
        lines = fp.read().split("\n")

    # print(part1(lines))
    print(part2(lines))




