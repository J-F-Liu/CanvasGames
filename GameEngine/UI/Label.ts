class Label extends GameObject {
    constructor(
        public text: string,
        public color: string,
        public fontname: string = "Courier New",
        public fontsize: string = "20px") {
        super();
    }

    draw(renderer: Renderer) {
        if (this.visible) {
            renderer.drawText(this.text, this.position, this.origin, this.color, "left", this.fontname, this.fontsize);
        }
    }

    get width() {
        return this.size.x;
    }

    get height() {
        return this.size.y;
    }

    get size() {
        return Label.calculateTextSize(this.fontname, this.fontsize, this.text);
    }

    centerTo(region: Rectangle) {
        this.position.x = region.left + (region.width - this.width) / 2;
        this.position.y = region.top + (region.height - this.height) / 2;
    }

    static calculateTextSize(fontname, fontsize, text) {
        var div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = "-1000px";
        div.style.top = "-1000px";
        document.body.appendChild(div);
        text = typeof text !== 'undefined' ? text : "M";
        div.style.fontSize = "" + fontsize;
        div.style.fontFamily = fontname;
        div.innerHTML = text;
        var size = new Vector2(div.offsetWidth, div.offsetHeight);
        document.body.removeChild(div);
        return size;
    }

    static CreateFpsLabel() {
        var fpsLabel = new Label("FPS", Color.black);
        var counter = 0;
        var time = 0;
        fpsLabel.update = function (frameSpan) {
            counter++;
            time += frameSpan;
            if (counter == 10) {
                this.text = Math.round(counter / time).toString();
                counter = 0;
                time = 0;
            }
        };
        return fpsLabel;
    }
} 