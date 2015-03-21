class SpriteImage {
    imageRect: Rectangle;
    constructor(public image: HTMLImageElement, imageRect: Rectangle = null) {
        this.imageRect = imageRect == null ? new Rectangle(0, 0, image.width, image.height) : imageRect;
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

    update(frameSpan: number) {
    }

    draw(position: Vector2, rotation: number, scale: number, origin: Vector2, mirror: boolean, renderer: Renderer) {
        renderer.drawImage(this.image, position, rotation, scale, origin, this.imageRect, mirror);
    }
}