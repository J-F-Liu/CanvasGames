// Penguin Pairs Game
// Junfeng Liu @ 2015-2-21

class Sprites {
    background_title = new StaticImage(new SpriteImage(Game.images['background_title']));
    button_play = new Button(new SpriteImage(Game.images['button_play']));
    button_options = new Button(new SpriteImage(Game.images['button_options']));
    button_help = new Button(new SpriteImage(Game.images['button_help']));
    button_back = new Button(new SpriteImage(Game.images['button_back']));

    background_options = new StaticImage(new SpriteImage(Game.images['background_options']));
    onOffLabel = new Label("Hints", Color.darkBlue, "Arial", "60px");
    onOffButton = new ToggleButton(new SpriteSheet(Game.images['button_offon@2'], 1, 2), 0, 1);
    musicText = new Label("Music volume", Color.darkBlue, "Arial", "60px");
    musicSlider = new Slider(new SpriteImage(Game.images['slider_bar']), new SpriteImage(Game.images['slider_button']), 5, 7, 8);

    background_help = new StaticImage(new SpriteImage(Game.images['background_help']));

    background_levelselect = new StaticImage(new SpriteImage(Game.images['background_levelselect']));
    level_solved = new SpriteSheet(Game.images['level_solved@6'], 1, 6);
    level_unsolved = new SpriteImage(Game.images['level_unsolved']);
    level_locked = new SpriteImage(Game.images['lock']);
    levelButtons: LevelButton[] = [];

    background_level = new StaticImage(new SpriteImage(Game.images['background_level']));
    button_hint = new Button(new SpriteImage(Game.images['button_hint']));
    button_retry = new Button(new SpriteImage(Game.images['button_retry']));
    button_quit = new Button(new SpriteImage(Game.images['button_quit']));
    level_finish = new Button(new SpriteImage(Game.images['level_finished_click']));
    frame_goal = new StaticImage(new SpriteImage(Game.images['frame_goal']));
    frame_tip = new StaticImage(new SpriteImage(Game.images['help']));

    hill = new SpriteImage(Game.images['wall']);
    shark = new SpriteImage(Game.images['shark']);
    seal = new SpriteSheet(Game.images['penguin@8'], 1, 8, 7);
    trap = new SpriteSheet(Game.images['penguin_boxed@8'], 1, 8, 7);
    ice_white = new SpriteSheet(Game.images['field@2'], 1, 2, 0);
    ice_blue = new SpriteSheet(Game.images['field@2'], 1, 2, 1);

    constructor() {
        // title
        this.button_play.position.set(415, 540);
        this.button_options.position.set(415, 650);
        this.button_help.position.set(415, 760);

        this.button_play.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        }
        this.button_options.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.options.id);
        }
        this.button_help.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.help.id);
        }
        this.button_back.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.title.id);
        }

        // options
        this.onOffLabel.position.set(150, 360);
        this.musicText.position.set(150, 490);
        this.button_back.position.set(415, 720);

        this.onOffButton.position.set(650, 340);
        this.onOffButton.on = GameWorld.options.showTip;
        this.onOffButton.change = function (value) {
            GameWorld.options.showTip = value;
        }

        this.musicSlider.position.set(650, 500);
        this.musicSlider.value = GameWorld.options.volume;
        this.musicSlider.change = function (value) {
            Game.audios['music'].volume = value * 0.5;
            GameWorld.options.volume = value;
        }

        // level play
        this.button_hint.position.set(916, 20);
        this.button_retry.position.set(916, 20);
        this.button_quit.position.set(1058, 20);
        this.button_retry.visible = false;
        this.level_finish.visible = false;
        this.level_finish.centerTo(Game.viewport);
        this.frame_tip.centerTo(Game.viewport);
        this.frame_tip.position.y = 780;

        this.button_hint.click = function () {
            GameWorld.currentLevel.hintArrow.visible = true;
        }
        this.button_retry.click = function () {
            GameWorld.gotoLevel(GameWorld.currentLevel.levelIndex);
        }
        this.button_quit.click = function () {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        }
        this.level_finish.click = function () {
            GameWorld.nextLevel();
        }
    }
}

class Scenes {
    title = new Scene(this.sprites.background_title, this.sprites.button_play, this.sprites.button_options, this.sprites.button_help);
    levelselect = new Scene(this.sprites.background_levelselect, this.sprites.button_back);
    options = new Scene(this.sprites.background_options, this.sprites.onOffLabel, this.sprites.onOffButton, this.sprites.musicText, this.sprites.musicSlider, this.sprites.button_back);
    help = new Scene(this.sprites.background_help, this.sprites.button_back);
    levelplay = new Scene(this.sprites.background_level, this.sprites.button_hint, this.sprites.button_retry, this.sprites.button_quit, null, this.sprites.level_finish);

    constructor(public sprites: Sprites) {
        for (var i = 0; i < GameData.levels.length; i++) {
            var level_button = new LevelButton(i);
            this.levelselect.add(level_button);
            GameWorld.sprites.levelButtons.push(level_button);
        }
        this.levelselect.onEnter = this.updateLevelButtons;
        this.options.onLeave = () => { GameWorld.options.save(); };
    }

    updateLevelButtons() {
        for (var i = 0; i < GameWorld.sprites.levelButtons.length; i++) {
            var level_button = GameWorld.sprites.levelButtons[i];
            if (i < GameWorld.score) {
                level_button.state = "solved";
            } else if (i == GameWorld.score) {
                level_button.state = "unsolved";
            } else {
                level_button.state = "locked";
            }
        }
    }
}

class GameWorld {
    static sprites: Sprites;
    static scenes: Scenes;
    static currentLevel: Level;
    static options = GameSettings.load(GameOptions);
    static scores = GameSettings.load(ScoreSheet);
    static get score(): number {
        return GameWorld.scores.maxScore;
    }

    static run() {
        Game.init(1200, 900);

        Game.loadImages("image/",
            "arrow@4.png", "arrow_hint@4.png", "arrow_hover@4.png",
            "background_help.jpg", "background_level.jpg", "background_levelselect.jpg", "background_options.jpg", "background_title.jpg",
            "button_back.jpg", "button_help.jpg", "button_hint.png", "button_offon@2.png", "button_options.jpg", "button_play.jpg", "button_quit.png", "button_retry.png",
            "field@2.png", "frame_goal.jpg", "help.jpg", "level_finished_click.png", "level_finished_tap.png", "level_solved@6.png", "level_unsolved.png",
            "lock.png", "penguin@8.png", "penguin_boxed@8.png", "penguin_pairs@8.png", "shark.png", "slider_bar.jpg", "slider_button.jpg", "wall.png"
            );
            
        if(Device.isPC){
            Game.loadAudios("audio/", "eat", "lost", "music", "pair", "won");
        }

        Game.start(function () {
            GameWorld.sprites = new Sprites();
            GameWorld.scenes = new Scenes(GameWorld.sprites);
            Game.scenes.switchTo(GameWorld.scenes.title.id);
            Sound.Play(Game.audios['music'], GameWorld.options.volume * 0.5, true);
        });
    }

    static gotoLevel(levelIndex) {
        var level = new Level(levelIndex);
        GameWorld.currentLevel = level;
        var count = GameWorld.scenes.levelplay.objects.length;
        GameWorld.scenes.levelplay.objects[count - 2] = level;
        GameWorld.sprites.level_finish.visible = false;
        Game.scenes.switchTo(GameWorld.scenes.levelplay.id);
    }

    static nextLevel() {
        var levelIndex = GameWorld.currentLevel.levelIndex + 1;
        if (levelIndex < GameData.levels.length) {
            GameWorld.gotoLevel(levelIndex);
        } else {
            Game.scenes.switchTo(GameWorld.scenes.levelselect.id);
        }
    }
};