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
        public maxIndex: number = rows * cols - 1) {
        super(image, rows, cols, startIndex, imageRect);
    }
    
    static Create(image: SpriteImage){
        return new Animation(image.image, 1, 1, image.imageRect, true);
    }

    get ended() {
        return !this.looping && this.sheetIndex == this.maxIndex;
    }

    get duration() {
        return this.frameTime * (this.maxIndex + 1);
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
            if (this._sheetIndex > this.maxIndex) {
                if (this.looping) {
                    this.sheetIndex = 0;
                } else {
                    this.sheetIndex = this.maxIndex;
                }
            } else {
                this.sheetIndex = this._sheetIndex;
            }
        }
    }
}