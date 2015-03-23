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

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }

    toggleVisibility() {
        this.visible = !this.visible;
    }
}

class StaticImage extends GameObject {
    rotation: number = 0;
    scale: number = 1;
    mirror: boolean = false;
    fixed: boolean = false;

    constructor(public image: SpriteImage) {
        super();
    }

    get size(): Vector2 {
        return this.image.size;
    }

    get width(): number {
        return this.image.width;
    }

    get height(): number {
        return this.image.height;
    }

    get left(): number {
        return this.position.x - this.origin.x;
    }

    get right(): number {
        return this.left + this.width;
    }

    get top(): number {
        return this.position.y - this.origin.y;
    }

    get bottom(): number {
        return this.top + this.height;
    }

    get region(): Rectangle {
        return new Rectangle(this.left, this.top, this.width, this.height);
    }

    get bound(): Shape {
        return new Rectangle(this.left, this.top, this.width, this.height);
    }

    centerTo(region: Rectangle) {
        this.position.x = region.left + (region.width - this.width) / 2;
        this.position.y = region.top + (region.height - this.height) / 2;
    }
    centerHorizontally(region: Rectangle, y: number) {
        this.position.x = region.left + (region.width - this.width) / 2;
        this.position.y = y;
    }
    centerVertically(region: Rectangle, x: number) {
        this.position.x = x;
        this.position.y = region.top + (region.height - this.height) / 2;
    }

    draw(renderer: Renderer) {
        if (this.visible) {
            this.image.draw(
                this.fixed ? this.position : Vector2.minus(this.position, Game.viewport.position),
                this.rotation, this.scale, this.origin, this.mirror, renderer);
        }
    }
}