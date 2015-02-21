enum Direction {
    left, right, up, down,
    east, south, west, north,
    ne, se, sw, nw
}

class Directions {
    static opposite(direction: Direction) {
        switch (direction) {
            case Direction.east:
                return Direction.west;
            case Direction.south:
                return Direction.north;
            case Direction.west:
                return Direction.east;
            case Direction.north:
                return Direction.south;
        }
    }

    static vector(direction: Direction) {
        switch (direction) {
            case Direction.east:
                return new Vector2(1, 0);
            case Direction.south:
                return new Vector2(0, 1);
            case Direction.west:
                return new Vector2(-1, 0);
            case Direction.north:
                return new Vector2(0, -1);
        }
    }
}