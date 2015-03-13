class GameOver extends Scene {
    scoreRankLabel: Label;
    constructor(
        public gameover: StaticImage,
        public playagain: Button) {
        super(gameover, playagain);
        this.gameover.centerTo(Game.viewport);
        this.playagain.position.set(450, 270);
        this.gameover.position.y -= 50;
        this.scoreRankLabel = new Label("", Color.red);
        this.scoreRankLabel.position.set(150, 250);
        this.add(this.scoreRankLabel);
    }

    update(frameSpan: number) {
        this.visible = GameWorld.lives <= 0;
        if (this.visible) {
            if (!Game.audios['music'].paused) {
                Game.audios['music'].pause();
            }
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