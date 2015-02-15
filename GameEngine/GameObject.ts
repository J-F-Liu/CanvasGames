class GameObject {

    position: Vector2 = Vector2.zero;

    origin: Vector2 = Vector2.zero;

    visible: boolean = true;

    //frameSpan is the time passed from previous frame in seconds
    update(frameSpan: number) {
    }

    draw(renderer: Renderer) {
    }

    reset() {
    }
}

class StaticImage extends GameObject {
    rotation: number = 0;
    scale: number = 1;
    mirror: boolean = false;
    imageRect: Rectangle;

    constructor(public image: HTMLImageElement) {
        super();
        this.imageRect = new Rectangle(0, 0, image.width, image.height);
    }

    get size(): Vector2 {
        return this.imageRect.size;
    }

    get width(): number {
        return this.imageRect.width;
    }

    get height(): number {
        return this.imageRect.height;
    }

    get left(): number {
        return this.position.x;
    }

    get right(): number {
        return this.position.x + this.width;
    }

    get top(): number {
        return this.position.y;
    }

    get bottom(): number {
        return this.position.y + this.height;
    }

    draw(renderer: Renderer) {
        renderer.drawImage(
            this.image, this.position, this.rotation, this.scale, this.origin, this.imageRect, this.mirror);
    }
}

interface Renderer {
    clear();
    drawImage(image: HTMLImageElement, position: Vector2, rotation: number, scale: number, origin: Vector2, sourceRect: Rectangle, mirror: boolean);
    drawText(text: string, position: Vector2, origin: Vector2, color: string, textAlign: string, fontname: string, fontsize: string);
    drawRectangle(color: string, x: number, y: number, width: number, height: number);
}