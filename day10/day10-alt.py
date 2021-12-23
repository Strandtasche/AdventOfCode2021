nav_sub = open("day10/input10.txt","r").read().splitlines()

symbol_dict = {"]":"[", ")":"(", ">":"<", "}":"{"}
symbol_values = {"]":57, ")":3, ">":25137, "}":1197}
symbol_list = []
error_score = 0

for i in nav_sub:
    for u in i:
        if u in symbol_dict.values():
            symbol_list.append(u)
        elif u in symbol_dict.keys():
            if symbol_list[-1] == symbol_dict.get(u):
                symbol_list = symbol_list[:-1]
            else:
                error_score += int(symbol_values.get(u))
                print(f"expected {symbol_list[-1]} but found {u}")
                break

    symbol_list = []

print(error_score)
