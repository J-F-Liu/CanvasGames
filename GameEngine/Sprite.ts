class Sprite extends StaticImage {
    velocity: Vector2 = Vector2.zero;

    constructor(image: HTMLImageElement) {
        super(image);
    }

    get bound(): Shape {
        return new Rectangle(this.position.x, this.position.y, this.imageRect.width, this.imageRect.height);
    }

    update(frameSpan: number) {
        var displacement = Vector2.times(frameSpan, this.velocity);
        this.position.add(displacement);
    }

    isInside(region: Rectangle): boolean {
        return region.contains(this.position);
    }

    isOutside(region: Rectangle): boolean {
        return !region.contains(this.position);
    }

    collideWith(sprite: Sprite): boolean {
        return this.visible && sprite.visible && this.bound.hasIntersect(sprite.bound);
    }
}

class ColoredSprite extends Sprite {
    color: string;

    constructor(
        public colors: { [name: string]: HTMLImageElement },
        defaultColor: string) {
        super(colors[defaultColor]);
        this.color = defaultColor;
    }

    draw(renderer: Renderer) {
        if (this.color != undefined) {
            this.image = this.colors[this.color];
            this.imageRect = new Rectangle(0, 0, this.image.width, this.image.height);
            super.draw(renderer);
        }
    }
} 