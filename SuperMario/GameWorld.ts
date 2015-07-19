// Super Mario Game
// Junfeng Liu @ 2015-3-21

class Sprites {
    title = new StaticImage(new SpriteImage(Game.images['sprites'], new Rectangle(0, 0, 480, 56)));
    sky_blue = new StaticImage(new SpriteImage(Game.images['sky_blue']));
    sky_green = new StaticImage(new SpriteImage(Game.images['sky_green']));
    wall_brown = new StaticImage(new SpriteImage(Game.images['wall_brown']));

    window = new SpriteImage(Game.images['sprites'], new Rectangle(120, 606, 40, 56));
    bg_wall = new SpriteImage(Game.images['sprites'], new Rectangle(120, 662, 40, 28));

    ground_yellow_left = new SpriteImage(Game.images['sprites'], new Rectangle(0, 550, 40, 28));
    ground_yellow_top = new SpriteImage(Game.images['sprites'], new Rectangle(40, 550, 40, 28));
    ground_yellow_corner = new SpriteImage(Game.images['sprites'], new Rectangle(80, 550, 40, 28));
    under_ground_yellow_left = new SpriteImage(Game.images['sprites'], new Rectangle(0, 578, 40, 28));
    under_ground_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(40, 578, 40, 28));

    ground_green_left = new SpriteImage(Game.images['sprites'], new Rectangle(120, 550, 40, 28));
    ground_green_top = new SpriteImage(Game.images['sprites'], new Rectangle(160, 550, 40, 28));
    ground_green_corner = new SpriteImage(Game.images['sprites'], new Rectangle(200, 550, 40, 28));
    under_ground_green_left = new SpriteImage(Game.images['sprites'], new Rectangle(120, 578, 40, 28));
    under_ground_green = new SpriteImage(Game.images['sprites'], new Rectangle(160, 578, 40, 28));

    ground_wheat_left = new SpriteImage(Game.images['sprites'], new Rectangle(240, 550, 40, 28));
    ground_wheat_top = new SpriteImage(Game.images['sprites'], new Rectangle(280, 550, 40, 28));
    ground_wheat_corner = new SpriteImage(Game.images['sprites'], new Rectangle(320, 550, 40, 28));
    under_ground_wheat_left = new SpriteImage(Game.images['sprites'], new Rectangle(240, 578, 40, 28));
    under_ground_wheat = new SpriteImage(Game.images['sprites'], new Rectangle(280, 578, 40, 28));

    ground_brown_left = new SpriteImage(Game.images['sprites'], new Rectangle(360, 550, 40, 28));
    ground_brown_top = new SpriteImage(Game.images['sprites'], new Rectangle(400, 550, 40, 28));
    ground_brown_corner = new SpriteImage(Game.images['sprites'], new Rectangle(440, 550, 40, 28));
    under_ground_brown_left = new SpriteImage(Game.images['sprites'], new Rectangle(360, 578, 40, 28));
    under_ground_brown = new SpriteImage(Game.images['sprites'], new Rectangle(400, 578, 40, 28));

    brick_short_brown = new SpriteImage(Game.images['sprites'], new Rectangle(240, 662, 40, 28));
    brick_long_brown = new SpriteImage(Game.images['sprites'], new Rectangle(280, 662, 80, 28));
    brick_short_gray = new SpriteImage(Game.images['sprites'], new Rectangle(360, 662, 40, 28));
    brick_long_gray = new SpriteImage(Game.images['sprites'], new Rectangle(400, 662, 80, 28));

    tree_crown_green = new SpriteImage(Game.images['sprites'], new Rectangle(80, 606, 40, 28));
    tree_stem_green = new SpriteImage(Game.images['sprites'], new Rectangle(80, 634, 40, 28));
    tree_stem_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(360, 522, 40, 28));

    big_tree_crown_left = new SpriteImage(Game.images['sprites'], new Rectangle(0, 606, 40, 28));
    big_tree_crown_right = new SpriteImage(Game.images['sprites'], new Rectangle(40, 606, 40, 28));
    big_tree_stem_left = new SpriteImage(Game.images['sprites'], new Rectangle(0, 634, 40, 28));
    big_tree_stem_right = new SpriteImage(Game.images['sprites'], new Rectangle(40, 634, 40, 28));

    pipe_cap_green = new SpriteImage(Game.images['sprites'], new Rectangle(0, 438, 80, 28));
    pipe_body_green = new SpriteImage(Game.images['sprites'], new Rectangle(0, 466, 80, 28));
    pipe_cap_red = new SpriteImage(Game.images['sprites'], new Rectangle(80, 438, 80, 28));
    pipe_body_red = new SpriteImage(Game.images['sprites'], new Rectangle(80, 466, 80, 28));
    pipe_cap_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(160, 438, 80, 28));
    pipe_body_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(160, 466, 80, 28));
    pipe_cap_silver = new SpriteImage(Game.images['sprites'], new Rectangle(240, 438, 80, 28));
    pipe_body_silver = new SpriteImage(Game.images['sprites'], new Rectangle(240, 466, 80, 28));
    pipe_cap_coffee = new SpriteImage(Game.images['sprites'], new Rectangle(320, 438, 80, 28));
    pipe_body_coffee = new SpriteImage(Game.images['sprites'], new Rectangle(320, 466, 80, 28));
    pipe_cap_brown = new SpriteImage(Game.images['sprites'], new Rectangle(400, 438, 80, 28));
    pipe_body_brown = new SpriteImage(Game.images['sprites'], new Rectangle(400, 466, 80, 28));

    block = new SpriteImage(Game.images['sprites'], new Rectangle(0, 410, 40, 28));
    note = new SpriteImage(Game.images['sprites'], new Rectangle(120, 410, 40, 28));
    stone = new SpriteImage(Game.images['sprites'], new Rectangle(160, 410, 40, 28));
    brick_red = new SpriteImage(Game.images['sprites'], new Rectangle(200, 410, 40, 28));
    brick_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(240, 410, 40, 28));
    wood_red = new SpriteImage(Game.images['sprites'], new Rectangle(280, 410, 40, 28));
    wood_yellow = new SpriteImage(Game.images['sprites'], new Rectangle(320, 410, 40, 28));
    xblock_brown = new SpriteImage(Game.images['sprites'], new Rectangle(360, 410, 40, 28));
    xblock_red = new SpriteImage(Game.images['sprites'], new Rectangle(400, 410, 40, 28));
    lift = new SpriteImage(Game.images['sprites'], new Rectangle(200, 662, 40, 28));

    pin_upward = new SpriteImage(Game.images['sprites'], new Rectangle(320, 634, 40, 28));
    pin_downward = new SpriteImage(Game.images['sprites'], new Rectangle(360, 634, 40, 28));
    donut = new SpriteImage(Game.images['sprites'], new Rectangle(320, 606, 40, 28));
    lava = new SpriteImage(Game.images['sprites'], new Rectangle(400, 746, 40, 28));
    exit = new SpriteImage(Game.images['sprites'], new Rectangle(280, 606, 40, 28));
    exit_bar = new SpriteImage(Game.images['sprites'], new Rectangle(280, 634, 40, 28));

    get coin() {
        return new Animation(Game.images['sprites'], 1, 3, new Rectangle(160, 194, 40, 28), true, 0.42);
    }
    get star() {
        return new Animation(Game.images['sprites'], 1, 5, new Rectangle(280, 194, 40, 28), true, 0.16);
    }
    get quest() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(40, 410, 40, 28), true, 0.33);
    }

    wood(color: string) {
        return this["wood_" + color];
    }

    brick(color: string) {
        return this["brick_" + color];
    }

    xblock(color: string) {
        return this["xblock_" + color];
    }

    background(color: string) {
        var bg = this[color];
        bg.fixed = true;
        return bg;
    }

    waterfall(color: string) {
        switch (color) {
            case "white":
                return new Animation(Game.images['sprites'], 1, 5, new Rectangle(0, 690, 40, 56), true, 0.16);
            case "red":
                return new Animation(Game.images['sprites'], 1, 5, new Rectangle(200, 690, 40, 56), true, 0.16);
        }
    }

    lava_top(x: number) {
        return new AnimatedSprite({
            "red": new Animation(Game.images['sprites'], 1, 5, new Rectangle(0, 746, 40, 28), true, 0.16, x % 5),
            "yellow": new Animation(Game.images['sprites'], 1, 5, new Rectangle(200, 746, 40, 28), true, 0.16, x % 5)
        }, "red");
    }

    ground_top(color: string) {
        return this["ground_" + color + "_top"];
    }
    ground_corner(color: string) {
        return this["ground_" + color + "_corner"];
    }
    ground_left(color: string) {
        return this["ground_" + color + "_left"];
    }

    under_ground(color: string) {
        return this["under_ground_" + color];
    }
    under_ground_left(color: string) {
        return this["under_ground_" + color + "_left"];
    }

    brick_short(color: string) {
        return this["brick_short_" + color];
    }
    brick_long(color: string) {
        return this["brick_long_" + color];
    }

    tree_crown(color: string) {
        switch (color) {
            case "yellow":
                return new Animation(Game.images['sprites'], 1, 2, new Rectangle(120, 522, 40, 28), true, 0.66);
            case "green":
                return this.tree_crown_green;
        }
    }
    tree_stem(color: string) {
        switch (color) {
            case "yellow":
                return this.tree_stem_yellow;
            case "green":
                return this.tree_stem_green;
        }
    }
    get tree_crown_top() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(120, 494, 40, 28), true, 0.66);
    }
    get tree_crown_left() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(0, 522, 40, 28), true, 0.66);
    }
    get tree_crown_right() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(240, 522, 40, 28), true, 0.66);
    }
    get grass_left() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(0, 494, 40, 28), true, 0.66);
    }
    get grass_center() {
        return new Animation(Game.images['sprites'], 1, 2, new Rectangle(240, 494, 40, 28), true, 0.66);
    }
    get grass_right() {
        return new Animation(Game.images['sprites'], 1, 3, new Rectangle(360, 494, 40, 28), true, 0.66);
    }

    lavaDuration: number;
    constructor() {
        // title
        this.title.centerHorizontally(Game.viewport, 84);
        this.lavaDuration = this.lava_top(0).animations['red'].duration;
    }
}

class Scenes {
    title = new Level(GameData.titleScreen);
    help = new Scene(AnimatedSprite.Create(this.sprites.grass_left));
    level1a = new Level(GameData.level1a);
    level2a = new Level(GameData.level2a);
    level4a = new Level(GameData.level4a);
    level5a = new Level(GameData.level5a);
    level6a = new Level(GameData.level6a);
    level6 = new Level(GameData.level6, this.level6a, null);
    level5 = new Level(GameData.level5, this.level5a, this.level6);
    level4 = new Level(GameData.level4, this.level4a, this.level5);
    level3 = new Level(GameData.level3, null, this.level4);
    level2 = new Level(GameData.level2, this.level2a, this.level3);
    level1 = new Level(GameData.level1, this.level1a, this.level2);

    constructor(public sprites: Sprites) {
        this.title.add(this.sprites.title);
        this.title.onEnter = function () {
            GameWorld.player.alive = false;
            setTimeout(() => GameWorld.scenes.level1.play(), 1000);
        };
    }
}

class GameWorld {
    static sprites: Sprites;
    static scenes: Scenes;
    static currentLevel: Level;
    static map: GameMap;
    static player: Player;
    static options = GameSettings.load(GameOptions);
    static scores = GameSettings.load(ScoreSheet);
    static get score(): number {
        return GameWorld.scores.maxScore;
    }

    static run() {
        Game.init(640, 364);

        Game.loadImages("image/", "sprites.png", "sky_green.png", "sky_blue.png", "wall_brown.png");

        //Game.loadAudios("audio/", "music", "player_die", "player_explode", "player_fall", "player_jump", "player_won", "water_collected");

        Game.start(function () {
            GameWorld.sprites = new Sprites();
            GameWorld.player = new Player();
            GameWorld.map = new GameMap(Game.viewport);
            GameWorld.scenes = new Scenes(GameWorld.sprites);
            GameWorld.scenes.title.play();
            //Game.scenes.switchTo(GameWorld.scenes.help.id);
            //Sound.Play(Game.audios['music'], GameWorld.options.volume * 0.5, true);
        });
    }

    static gotoNexLevel() {
        if (GameWorld.currentLevel.nextLevel != null) {
            GameWorld.currentLevel.nextLevel.play();
        } else {
            GameWorld.scenes.title.play();
        }
    }

    static gotoAwardLevel(pipe: string = 'a') {
        if (GameWorld.currentLevel.awardLevel != null) {
            GameWorld.currentLevel.awardLevel.play(true);
            GameWorld.currentLevel.findPipe(pipe).releasePlayer();
        } else {
            GameWorld.gotoNexLevel();
        }
    }
}