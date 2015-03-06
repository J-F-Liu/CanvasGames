class Tile {
    rowIndex: number;
    colIndex: number;
    grid: TileGrid;

    constructor(public type: number, public image: SpriteImage = null) {
    }

    get position() {
        var position = new Vector2(this.colIndex * this.grid.cellWidth, this.rowIndex * this.grid.cellHeight);
        return Vector2.plus(this.grid.position, position);
    }

    get width() {
        return this.grid.cellWidth;
    }

    get height() {
        return this.grid.cellHeight;
    }

    get region() {
        var pos = this.position;
        return new Rectangle(pos.x, pos.y, this.grid.cellWidth, this.grid.cellHeight);
    }

    get east() {
        return this.grid.at(this.rowIndex, this.colIndex + 1);
    }

    get south() {
        return this.grid.at(this.rowIndex + 1, this.colIndex);
    }

    get west() {
        return this.grid.at(this.rowIndex, this.colIndex - 1);
    }

    get north() {
        return this.grid.at(this.rowIndex - 1, this.colIndex);
    }

    neighbour(direction: number): Tile {
        switch (direction) {
            case Direction.east:
                return this.east;
            case Direction.south:
                return this.south;
            case Direction.west:
                return this.west;
            case Direction.north:
                return this.north;
            default:
                throw "Unknown direction: " + direction;
        }
    }

    equals(tile: Tile): boolean {
        return this.rowIndex == tile.rowIndex && this.colIndex == tile.colIndex;
    }
}