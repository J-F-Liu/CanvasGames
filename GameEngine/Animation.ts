class Animation extends SpriteSheet {
    time: number = 0;
    constructor(
        image: HTMLImageElement,
        rows: number,
        cols: number,
        imageRect: Rectangle = null,
        public looping: boolean = false,
        public frameTime: number = 0.1,
        public startIndex: number = 0,
        public endIndex: number = rows * cols - 1) {
        super(image, rows, cols, startIndex, imageRect);
    }

    get ended() {
        return !this.looping && this.sheetIndex == this.endIndex;
    }

    play() {
        this.time = 0;
        this.sheetIndex = this.startIndex;
    }

    update(frameSpan: number) {
        this.time += frameSpan;
        while (this.time > this.frameTime) {
            this.time -= this.frameTime;
            this._sheetIndex++;
            if (this._sheetIndex > this.endIndex) {
                if (this.looping) {
                    this.sheetIndex = this.startIndex;
                } else {
                    this.sheetIndex = this.endIndex;
                }
            } else {
                this.sheetIndex = this._sheetIndex;
            }
        }
    }
}