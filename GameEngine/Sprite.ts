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
        return this.left >= region.left && this.top >= region.top && this.right <= region.right && this.bottom <= region.bottom;
    }

    isOutside(region: Rectangle): boolean {
        return this.left >= region.right || this.top >= region.bottom || this.right <= region.left || this.bottom <= region.top;
    }

    collideWith(sprite: Sprite): boolean {
        return this.visible && sprite.visible && this.bound.hasIntersect(sprite.bound);
    }

    moveTo(speed: number, destination: Vector2) {
        var direction = Vector2.minus(destination, this.position);
        this.velocity = Physics.move(speed, direction);
        var time = direction.length / speed;
        var self = this;
        window.setTimeout(function () { self.velocity = Vector2.zero; }, time * 1000);
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