// Painter Game
// Junfeng Liu @ 2015-2-14

class Sprites {
    background = new StaticImage(new SpriteImage(Game.images['background']));
    cannon = new Cannon();
    can1 = new PaintCan(450, 'red');
    can2 = new PaintCan(582, 'green');
    can3 = new PaintCan(704, 'blue');
    ball = new Ball();
    plusTen = new Particle(new SpriteImage(Game.images['plus_ten']), 1, function () {
        GameWorld.sprites.plusTen.position.set(GameWorld.sprites.ball.right, GameWorld.sprites.ball.top);
        GameWorld.sprites.plusTen.velocity.set(54, -60);
    });
    minusTen = new Particle(new SpriteImage(Game.images['minus_ten']), 1, function () {
        GameWorld.sprites.minusTen.position.set(GameWorld.sprites.ball.right, GameWorld.sprites.ball.top);
        GameWorld.sprites.minusTen.velocity.set(48, 70);
    });
    lives = new Lives(new StaticImage(new SpriteImage(Game.images['lives'])));
    score = new Score(Game.images['scorebar']);
    gameover = new GameOver(
        new StaticImage(new SpriteImage(Game.images['gameover'])),
        new Button(new SpriteImage(Game.images['play_again'])));

    createPlayingScene() {
        var playing = new Scene(
            this.background,
            this.can1, this.can2, this.can3, this.ball, this.cannon,
            this.plusTen, this.minusTen,
            this.lives, this.score, this.gameover
            );
        playing.onStart = function () {
            Sound.Play(Game.audios['music'], 0.3, true);
        };
        return playing;
    }
}

class GameWorld {
    static lives: number = 5;
    static score: number = 0;
    static scores = GameSettings.load(ScoreSheet);
    static sprites: Sprites;

    static run() {
        Game.init(800, 480);

        Game.loadImages("image/",
            "background.jpg", "scorebar.jpg",
            "cannon_barrel.png", "cannon_red.png", "cannon_green.png", "cannon_blue.png",
            "ball_red.png", "ball_green.png", "ball_blue.png",
            "can_red.png", "can_green.png", "can_blue.png", "plus_ten.png", "minus_ten.png",
            "lives.png", "gameover.png", "play_again.png");

        Game.loadAudios("audio/", "music", "collect_points", "lose_points", "shoot_paint", "bubble_burst");

        Game.start(function () {
            GameWorld.sprites = new Sprites();
            var playing = GameWorld.sprites.createPlayingScene();
            Game.scenes.add(playing);
            Game.scenes.switchTo(playing.id);
        });
    }

    static reset() {
        GameWorld.score = 0;
        GameWorld.lives = 5;
        Game.scenes.currentScene.reset();
    }
};