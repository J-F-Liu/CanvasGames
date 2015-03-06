enum TileType {
    background, platform, platform_ice, platform_hot, wall, wall_ice, wall_hot, exit
}

class Level extends GameObjectGroup {
    tip: string;
    goal: number;
    tiles: TileGrid;
    enemies: Enemy[] = [];
    waterdrops: WaterDrop[] = [];
    hintBar: GameObjectGroup;
    clouds: ParticleSource;
    startTime: number;

    constructor(public levelIndex: number) {
        super();
        var levelData = GameData.levels[levelIndex];
        this.tip = levelData.tip;
        this.addMountains();
        this.addClouds();
        this.loadTiles(levelData.tiles);
        var tipLabel = new Label(this.tip, Color.darkBlue, "Arial", "16px");
        tipLabel.centerTo(GameWorld.sprites.frame_hint.region);
        this.hintBar = new GameObjectGroup(GameWorld.sprites.frame_hint, tipLabel);
        this.add(this.hintBar);
        this.startTime = Game.totalTime;
    }

    addMountains() {
        for (var i = 0; i < 5; i++) {
            var imageName = "mountain_" + (Math.ceil(Math.random() * 2));
            var mountain = new StaticImage(new SpriteImage(Game.images[imageName]));
            mountain.position = new Vector2(
                Math.random() * Game.viewport.width - mountain.width / 2, Game.viewport.height - mountain.height);
            this.add(mountain);
        }
    }

    addClouds() {
        this.clouds = new ParticleSource(function () {
            var cloud = new Particle(new SpriteImage(Game.images["cloud_" + Math.ceil(Math.random() * 5)]), -1);
            cloud.onEmit = function () {
                cloud.position = new Vector2(Math.random() * Game.viewport.width - cloud.width / 2,
                    (Math.random() * Game.viewport.height - cloud.height) / 2);
                cloud.velocity = new Vector2((Math.random() * 2 - 1) * 20, 0);
            };
            cloud.onFly = function () {
                if ((cloud.velocity.x < 0 && cloud.position.x + cloud.width < 0) ||
                    (cloud.velocity.x > 0 && cloud.position.x > Game.viewport.right)) {
                    cloud.image = new SpriteImage(Game.images["cloud_" + Math.ceil(Math.random() * 5)]);
                    cloud.velocity = new Vector2((Math.random() * 2 - 1) * 20, 0);
                    cloud.position.x = cloud.velocity.x < 0 ? Game.viewport.width : -cloud.width;
                    cloud.position.y = (Math.random() * Game.viewport.height - cloud.height) / 2;
                }
            }
            return cloud;
        });
        for (var i = 0; i < 3; i++) {
            this.clouds.emit();
        }
        this.add(this.clouds);
    }

    get finished() {
        var count = 0;
        for (var i = 0; i < this.waterdrops.length; i++) {
            if (this.waterdrops[i].visible == false) {
                count++;
            }
        }
        return count == this.waterdrops.length;
    }

    update(frameSpan: number) {
        super.update(frameSpan);
        if (Game.totalTime - this.startTime > 5) {
            this.hintBar.visible = false;
        }
        if (Keyboard.pressed(Keys.enter)) {
            if (GameWorld.sprites.overlay_welldone.visible == true) {
                GameWorld.sprites.overlay_welldone.click();
            }
            if (GameWorld.sprites.overlay_gameover.visible == true) {
                GameWorld.sprites.overlay_gameover.click();
            }
        }
    }

    createTile(char: string, row: number, col: number): Tile {
        switch (char) {
            case '-':
                return new Tile(TileType.platform, GameWorld.sprites.platform);
            case '+':
                return new Tile(TileType.platform_hot, GameWorld.sprites.platform_hot);
            case '@':
                return new Tile(TileType.platform_ice, GameWorld.sprites.platform_ice);
            case '#':
                return new Tile(TileType.wall, GameWorld.sprites.wall);
            case '^':
                return new Tile(TileType.wall_hot, GameWorld.sprites.wall_hot);
            case '*':
                return new Tile(TileType.wall_ice, GameWorld.sprites.wall_ice);
            case 'X':
                return new Tile(TileType.exit);
            case '.':
            default:
                return new Tile(TileType.background);
        }
    }

    createEnemy(char: string, tile: Tile): Enemy {
        switch (char) {
            case 'R':
                return new Rocket(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)), Direction.left);
            case 'r':
                return new Rocket(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)), Direction.right);
            case 'S':
                return new Sparky(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height - 200)));
            case 'T':
                return new Turtle(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)));
            case 'A':
                return new Flame(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)), PatrolType.random);
            case 'B':
                return new Flame(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)), PatrolType.following);
            case 'C':
                return new Flame(Vector2.plus(tile.position, new Vector2(tile.width / 2, tile.height)), PatrolType.regular);
            default:
                return null;
        }
    }

    loadTiles(tiles: string[]) {
        var tileGrid = new TileGrid(tiles.length, tiles[0].length, 72, 55);
        this.add(tileGrid);
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var char = tiles[row][col];
                var tile = this.createTile(char, row, col);
                tileGrid.addAt(tile, row, col);

                if (char == '1') {
                    GameWorld.player.startAt(tile);
                } else if (char == 'W') {
                    this.waterdrops.push(new WaterDrop(tile));
                } else if (char == 'X') {
                    GameWorld.sprites.goal.position = tile.position;
                    GameWorld.sprites.goal.origin.y = GameWorld.sprites.goal.height - tileGrid.cellHeight;
                    this.add(GameWorld.sprites.goal);
                } else if(GameWorld.options.enableEnemies) {
                    var enemy = this.createEnemy(char, tile);
                    if (enemy != null) {
                        this.enemies.push(enemy);
                    }
                }
            }
        }
        this.tiles = tileGrid;
        this.addArray(this.waterdrops);
        this.addArray(this.enemies);
    }
} 