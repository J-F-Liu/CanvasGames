class SpriteSheet extends SpriteImage {
    _sheetIndex: number = 0;
    sheetPosition: Vector2;
    constructor(
        public image: HTMLImageElement,
        public rows: number,
        public cols: number,
        sheetIndex: number = 0,
        imageRect: Rectangle = null) {
        super(image, imageRect == null ? new Rectangle(0, 0, image.width / cols, image.height / rows) : imageRect);
        this.sheetPosition = this.imageRect.position;
        this.sheetIndex = sheetIndex;
    }

    get cells(): number {
        return this.rows * this.cols;
    }

    get sheetIndex(): number {
        return this._sheetIndex;
    }

    set sheetIndex(value: number) {
        if (value >= 0) {
            this._sheetIndex = value % this.cells;
            var rowIndex = Math.floor(this.sheetIndex / this.cols);
            var colIndex = this.sheetIndex % this.cols;
            this.imageRect.x = this.sheetPosition.x + colIndex * this.width;
            this.imageRect.y = this.sheetPosition.y + rowIndex * this.height;
        }
    }
}