class GameOver extends Scene {
    constructor(
        public gameover: StaticImage,
        public playagain: Button) {
        super(gameover, playagain);
        this.gameover.position = Game.viewport.center;
        this.gameover.origin = gameover.imageRect.center;
        this.playagain.position.set(450, 270);
        this.gameover.position.y -= 50;
    }

    update(frameSpan: number) {
        this.visible = GameWorld.lives <= 0;
        if (this.visible) {
            if (!Game.audios['music'].paused) {
                Game.audios['music'].pause();
            }
            document.body.style.cursor = "default";
            super.update(frameSpan);
            if (Keyboard.pressed(Keys.enter) || this.playagain.pressed) {
                GameWorld.reset();
                if (Game.audios['music'].paused) {
                    Game.audios['music'].play();
                }
            }
        }
    }
} 