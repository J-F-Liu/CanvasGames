class Cannon extends ColoredSprite {
    barrel: StaticImage;
    constructor() {
        super(
            {
                red: Game.images['cannon_red'],
                green: Game.images['cannon_green'],
                blue: Game.images['cannon_blue'],
            }, 'red');
        this.barrel = new StaticImage(Game.images['cannon_barrel']);
        this.barrel.position = new Vector2(72, 405);
        this.barrel.origin = new Vector2(34, 34);
        this.position = Vector2.minus(this.barrel.position, Vector2.times(0.52, this.size));
        Mouse.position = Vector2.plus(this.position, new Vector2(100, 0));
    }

    handleInput() {
        if (Keyboard.pressed(Keys.space)) {
            switch (this.color) {
                case 'red':
                    this.color = 'green';
                    break;
                case 'green':
                    this.color = 'blue';
                    break;
                case 'blue':
                    this.color = 'red';
                    break;
            }
        }
        var direction = Vector2.minus(Mouse.position, this.barrel.position);
        this.barrel.rotation = Math.atan2(direction.y, direction.x);
    }

    update(frameSpan: number) {
        if (GameWorld.lives > 0) {
            this.handleInput();
            super.update(frameSpan);
        }
    }

    draw(renderer: Renderer) {
        this.barrel.draw(renderer);
        super.draw(renderer);
    }

    get ballPosition(): Vector2 {
        var opposite = Math.sin(this.barrel.rotation) * this.barrel.width * 0.6;
        var adjacent = Math.cos(this.barrel.rotation) * this.barrel.width * 0.6;
        return new Vector2(this.barrel.position.x + adjacent, this.barrel.position.y + opposite);
    }
}