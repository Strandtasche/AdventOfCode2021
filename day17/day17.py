
def loc_y(v: int, s: int) -> int:
    return s * v - (s*(s-1)/2)

def loc_x(v, s):
    s = min(s, v)
    return s * v - (s*(s-1)/2)

if __name__ == "__main__":
    # target_y_up = -5
    # target_y_low = -10
    # target_x_low = 20
    # target_x_up = 30
    target_x_up = 157
    target_x_low = 102
    target_y_up = -90
    target_y_low = -146

    print(f"part 1: {(-1 * target_y_low -1) * (-1 * target_y_low) /2}")

    valids = []
    # for step in range(10):
    #     xloc = loc_x(7, step)
    #     yloc = loc_y(2, step)
    #     print(f"{xloc, yloc} at step {step}")

    for x_val in range(500):
        for y_val in range(-500, 500):
            for step in range(10000):
                xloc = loc_x(x_val, step)
                yloc = loc_y(y_val, step)

                if xloc > target_x_up or yloc < target_y_low:
                    break
                elif target_x_low <= xloc <= target_x_up and target_y_low <= yloc <= target_y_up:
                    valids.append((x_val, y_val))
                    break


    print(len(valids))
    print(len(set(valids)))
    pass





