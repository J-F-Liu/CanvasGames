class Animation extends SpriteSheet {
    time: number = 0;
    constructor(
        public image: HTMLImageElement,
        public rows: number,
        public cols: number,
        public looping: boolean = false,
        public frameTime: number = 0.1,
        public startIndex: number = 0,
        public endIndex: number = rows * cols - 1) {
        super(image, rows, cols, startIndex);
    }

    get ended() {
        return !this.looping && this.sheetIndex == this.endIndex;
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