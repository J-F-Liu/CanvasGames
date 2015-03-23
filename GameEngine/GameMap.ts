class GameMap {
    constructor(public viewport: Rectangle, public size: Vector2 = viewport.size) {
    }

    get width() {
        return this.size.x;
    }

    get height() {
        return this.size.y;
    }

    scrollLeft(dx: number) {
        this.viewport.x -= Math.round(dx);
        if (this.viewport.x < 0) {
            this.viewport.x = 0;
        }
    }

    scrollRight(dx: number) {
        this.viewport.x += Math.round(dx);
        if (this.viewport.x > this.width - this.viewport.width) {
            this.viewport.x = this.width - this.viewport.width;
        }
    }
} 