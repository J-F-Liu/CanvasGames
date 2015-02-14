// Painter Game
// Junfeng Liu @ 2015-2-14

class GameWorld {
    static score: number = 0;
    static lives: number = 5;
    static cannon: Cannon;
    static ball: Ball;

    static run() {
        Game.init(800, 480);

        Game.loadImages("image/",
            "background.jpg", "scorebar.jpg",
            "cannon_barrel.png", "cannon_red.png", "cannon_green.png", "cannon_blue.png",
            "ball_red.png", "ball_green.png", "ball_blue.png",
            "can_red.png", "can_green.png", "can_blue.png",
            "lives.png", "gameover_click.png");

        Game.loadAudios("audio/", "collect_points", "music", "shoot_paint");

        Game.start(function () {
            var background = new StaticImage(Game.images['background']);
            var live = new StaticImage(Game.images['lives']);
            var gameover = new StaticImage(Game.images['gameover_click']);
            var cannon = new Cannon();
            var can1 = new PaintCan(450, 'red');
            var can2 = new PaintCan(582, 'green');
            var can3 = new PaintCan(704, 'blue');
            var ball = new Ball();
            var lives = new Lives(live, gameover);
            var score = new Score(Game.images['scorebar']);

            GameWorld.cannon = cannon;
            GameWorld.ball = ball;

            var fpsLabel = new Label("FPS", Color.black);
            fpsLabel.update = function (frameSpan) {
                this.text = Math.round(1 / frameSpan).toString();
            };

            var playing = new Scene(
                background,
                can1, can2, can3, ball, cannon,
                lives, score
                );
            playing.onStart = function () {
                Sound.Play(Game.audios['music'], 0.3, true);
            };

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