enum Direction {
    left, right, up, down,
    east, south, west, north,
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
            case Direction.right:
                return new Vector2(1, 0);
            case Direction.south:
            case Direction.down:
                return new Vector2(0, 1);
            case Direction.west:
            case Direction.left:
                return new Vector2(-1, 0);
            case Direction.north:
            case Direction.up:
                return new Vector2(0, -1);
        }
    }
}