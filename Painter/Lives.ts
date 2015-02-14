class Lives extends GameObject {
    constructor(
        public live: StaticImage,
        public gameover: StaticImage) {
        super();
        this.gameover.position = Game.viewport.center;
        this.gameover.origin = gameover.imageRect.center;
    }

    draw(renderer: Renderer) {
        for (var i = 0; i < GameWorld.lives; i++) {
            this.live.position.set(i * this.live.width + 15, 60);
            this.live.draw(renderer);
        }
        if (GameWorld.lives <= 0) {
            this.gameover.draw(renderer);
        }
    }

    update() {
        if (GameWorld.lives <= 0) {
            if (!Game.audios['music'].paused) {
                Game.audios['music'].pause();
            }
            if (Keyboard.pressed(Keys.enter) || Mouse.left.pressed) {
                GameWorld.reset();
                if (Game.audios['music'].paused) {
                    Game.audios['music'].play();
                }
            }
        }
    }
} 