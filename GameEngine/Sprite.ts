class Sprite extends StaticImage {
    velocity: Vector2 = Vector2.zero;

    constructor(image: SpriteImage) {
        super(image);
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
    private _color: string;

    constructor(
        public colors: { [name: string]: SpriteImage },
        defaultColor: string) {
        super(colors[defaultColor]);
        this.color = defaultColor;
    }

    get color() {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
        this.image = this.colors[this._color];
    }
} 