interface Renderer {
    clear();
    drawImage(image: HTMLImageElement, position: Vector2, rotation: number, scale: number, origin: Vector2, sourceRect: Rectangle, mirror: boolean);
    drawText(text: string, position: Vector2, origin: Vector2, color: string, textAlign: string, fontname: string, fontsize: string);
    drawRectangle(color: string, x: number, y: number, width: number, height: number);
}

class Canvas2D implements Renderer {
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.context = <CanvasRenderingContext2D>canvas.getContext('2d');
        window.onresize = this.resize;
        this.resize();
    }

    resize() {
        var widthToHeight = Game.viewport.width / Game.viewport.height;
        var newWidth = window.innerWidth;
        var newHeight = window.innerHeight;
        var newWidthToHeight = newWidth / newHeight;

        if (newWidthToHeight > widthToHeight) {
            newWidth = newHeight * widthToHeight;
        } else {
            newHeight = newWidth / widthToHeight;
        }

        Game.canvas.style.height = newHeight + 'px';
        Game.canvas.style.width = newWidth + 'px';
        Game.canvas.style.marginLeft = (window.innerWidth - newWidth) / 2 + 'px';
        Game.canvas.style.marginTop = (window.innerHeight - newHeight) / 2 + 'px';
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawImage(image: HTMLImageElement, position: Vector2, rotation: number, scale: number, origin: Vector2, sourceRect: Rectangle, mirror: boolean) {
        this.context.save();
        if (mirror) {
            this.context.scale(-1, 1);
            this.context.translate(-position.x - sourceRect.width, position.y);
            this.context.rotate(rotation);
            this.context.drawImage(image, sourceRect.x, sourceRect.y,
                sourceRect.width, sourceRect.height,
                origin.x, -origin.y,
                sourceRect.width * scale, sourceRect.height * scale);
        }
        else {
            this.context.translate(position.x, position.y);
            this.context.rotate(rotation);
            this.context.drawImage(image, sourceRect.x, sourceRect.y,
                sourceRect.width, sourceRect.height,
                -origin.x, -origin.y,
                sourceRect.width * scale, sourceRect.height * scale);
        }
        this.context.restore();
    }

    drawText(text: string, position: Vector2, origin: Vector2, color: string, textAlign: string, fontname: string, fontsize: string) {
        this.context.save();
        this.context.translate(position.x - origin.x, position.y - origin.y);
        this.context.textBaseline = 'top';
        this.context.font = fontsize + " " + fontname;
        this.context.fillStyle = color;
        this.context.textAlign = textAlign;
        this.context.fillText(text, 0, 0);
        this.context.restore();
    }

    drawRectangle(color: string, x: number, y: number, width: number, height: number) {
        this.context.save();
        this.context.fillStyle = color;
        this.context.fillRect(x, y, width, height);
        this.context.restore();
    }
} 