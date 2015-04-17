class TileGrid extends GameObject {
    tiles: Tile[] = [];
    constructor(public rows: number, public cols: number, public cellWidth: number, public cellHeight: number) {
        super();
    }

    get width(): number {
        return this.cellWidth * this.cols;
    }

    get height(): number {
        return this.cellHeight * this.rows;
    }

    get region(): Rectangle {
        return new Rectangle(this.position.x, this.position.y, this.width, this.height);
    }

    add(tile: Tile) {
        tile.grid = this;
        tile.rowIndex = Math.floor(this.tiles.length / this.cols);
        tile.colIndex = this.tiles.length % this.cols;
        this.tiles.push(tile);
    }

    addAt(tile: Tile, row: number, col: number) {
        tile.grid = this;
        tile.rowIndex = row;
        tile.colIndex = col;
        var index = row * this.cols + col;
        this.tiles[index] = tile;
    }

    at(row: number, col: number) {
        if (row >= 0 && row < this.rows && col >= 0 && col < this.cols) {
            var index = row * this.cols + col;
            return this.tiles[index];
        } else {
            return null;
        }
    }

    find(position: Vector2) {
        var location = Vector2.minus(position, this.position);
        var row = Math.floor(location.y / this.cellHeight);
        var col = Math.floor(location.x / this.cellWidth);
        return this.at(row, col);
    }

    draw(renderer: Renderer) {
        for (var i = 0; i < this.tiles.length; i++) {
            var tile = this.tiles[i];
            if (tile.image != null) {
                tile.image.draw(Vector2.minus(tile.position, Game.viewport.position), 0, 1, this.origin, tile.mirror, renderer);
            }
        }
    }
}