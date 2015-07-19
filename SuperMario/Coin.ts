class Coin extends AnimatedSprite {
    glitter: Glitter;
    constructor(position: Vector2) {
        super({
            "default": GameWorld.sprites.coin
        }, "default");
        this.position = position;
        this.origin = new Vector2(this.image.width / 2, this.image.height / 2);
        var coinGlitter = new Glitter();
        coinGlitter.addStar(10, 4, "#ffffff", 20);
        coinGlitter.addStar(GameData.tileWidth - 12, 12, "#ffffff", 18);
        coinGlitter.addStar(20, GameData.tileHeight - 6, "#ffffff", 16);
        coinGlitter.addDot(GameData.tileWidth - 18, 4, "#ffffff", 15);
        coinGlitter.addDot(12, 14, "#ffffff", 17);
        coinGlitter.addDot(6, 18, "#ffffff", 15);
        coinGlitter.position.set(this.left, this.top);
        this.glitter = coinGlitter;
    }

    reset() {
        this.visible = true;
        this.glitter.reset();
    }

    get bound() {
        return new Circle(this.position.x, this.position.y, this.image.height / 2);
    }

    update(frameSpan: number) {
        if (this.visible) {
            super.update(frameSpan);
            if (this.collideWith(GameWorld.player)) {
                GameWorld.player.coins++;
                this.visible = false;
                this.glitter.visible = true;
                GameWorld.currentLevel.add(this.glitter);
            }
        }
    }
}