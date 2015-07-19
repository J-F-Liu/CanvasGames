enum TileType {
    background, ground, ground_top, ground_top_left, ground_top_right, ground_edge_left, ground_edge_right,
    ground_brick, wall, tree_crown, pipe_left, pipe_right, waterfall, lava, coin, star, pin
}

class Level extends Scene {
    tip: string;
    goal: number;
    tiles: TileGrid;
    pipes: Pipe[] = [];
    lavas: AnimatedSprite[] = [];
    hintBar: GameObjectGroup;
    background: StaticImage;
    clouds: ParticleSource;
    startTime: number;
    lavaTime: number = 0;

    constructor(public levelData, public awardLevel: Level = null, public nextLevel: Level = null) {
        super();
        this.tip = levelData.tip;
        if (this.levelData.background != null) {
            this.background = GameWorld.sprites.background(this.levelData.background);
            this.add(this.background);
        }
        //this.addMountains();
        //this.addClouds();
        this.loadTiles(levelData.tiles);
        var tipLabel = new Label(this.tip, Color.darkBlue, "Arial", "16px");
        //this.add(this.hintBar);
        this.addArray(this.lavas);
        this.add(GameWorld.player);
        this.addArray(this.pipes);
        //this.add(Label.CreateFpsLabel());
        if (awardLevel != null) {
            awardLevel.awardLevel = this;
        }
    }

    play(transport: boolean = false) {
        this.startTime = Game.totalTime;
        GameWorld.currentLevel = this;
        Game.scenes.switchTo(this.id);
        GameWorld.player.tiles = this.tiles;
        GameWorld.map.size.set(this.tiles.width, this.tiles.height);
        if (!transport) {
            GameWorld.player.position.set(this.levelData.initX, this.levelData.initY - 1);
            this.reset();
            Game.viewport.x = Math.max(0, GameWorld.player.position.x - Game.viewport.width / 2);
        }
    }

    addMountains() {
        for (var i = 0; i < 5; i++) {
            var imageName = "mountain_" + (Math.ceil(Math.random() * 2));
            var mountain = new StaticImage(new SpriteImage(Game.images[imageName]));
            mountain.position = new Vector2(Math.random() * Game.viewport.width - mountain.width / 2, Game.viewport.height - mountain.height);
            this.add(mountain);
        }
    }

    addClouds() {
        this.clouds = new ParticleSource(function () {
            var cloud = new Particle(new SpriteImage(Game.images["cloud_" + Math.ceil(Math.random() * 5)]), -1);
            cloud.onEmit = function () {
                cloud.position = new Vector2(Math.random() * Game.viewport.width - cloud.width / 2,(Math.random() * Game.viewport.height - cloud.height) / 2);
                cloud.velocity = new Vector2((Math.random() * 2 - 1) * 20, 0);
            };
            cloud.onFly = function () {
                if ((cloud.velocity.x < 0 && cloud.position.x + cloud.width < 0) || (cloud.velocity.x > 0 && cloud.position.x > Game.viewport.right)) {
                    cloud.image = new SpriteImage(Game.images["cloud_" + Math.ceil(Math.random() * 5)]);
                    cloud.velocity = new Vector2((Math.random() * 2 - 1) * 20, 0);
                    cloud.position.x = cloud.velocity.x < 0 ? Game.viewport.width : -cloud.width;
                    cloud.position.y = (Math.random() * Game.viewport.height - cloud.height) / 2;
                }
            };
            return cloud;
        });
        for (var i = 0; i < 3; i++) {
            this.clouds.emit();
        }
        this.add(this.clouds);
    }

    update(frameSpan) {
        super.update(frameSpan);
        this.lavaTime += frameSpan;
        if (this.lavas.length > 0 && this.lavaTime > GameWorld.sprites.lavaDuration) {
            this.lavaTime -= GameWorld.sprites.lavaDuration;
            this.lavas.forEach(function (lava) {
                if (lava.animation == 'red') {
                    lava.animation = 'yellow';
                } else {
                    lava.animation = 'red';
                }
            });
        }
        if (Keyboard.pressed(Keys.enter)) {
        }
    }

    draw(renderer: Renderer) {
        renderer.clear();
        super.draw(renderer);
    }

    createTile(char: string, row: number, col: number) {
        switch (char) {
            case '~':
                return new Tile(TileType.ground_top, GameWorld.sprites.ground_top(this.levelData.groundColor));
            case '{':
                return new Tile(TileType.ground_top_left, GameWorld.sprites.ground_left(this.levelData.groundColor));
            case '}':
                return new Tile(TileType.ground_top_right, GameWorld.sprites.ground_left(this.levelData.groundColor), true);
            case '_':
                return new Tile(TileType.ground, GameWorld.sprites.under_ground(this.levelData.groundColor));
            case '(':
                return new Tile(TileType.ground_edge_left, GameWorld.sprites.under_ground_left(this.levelData.groundColor));
            case ')':
                return new Tile(TileType.ground_edge_right, GameWorld.sprites.under_ground_left(this.levelData.groundColor), true);
            case 'H':
                return new Tile(TileType.ground_brick);
            case '!':
                return new Tile(TileType.waterfall);
            case 'Y':
                return new Tile(TileType.lava);
            case '^':
                return new Tile(TileType.tree_crown, GameWorld.sprites.tree_crown(this.levelData.treeColor));
            case '|':
                return new Tile(TileType.background, GameWorld.sprites.tree_stem(this.levelData.treeColor));
            case 'q':
                return new Tile(TileType.background, GameWorld.sprites.grass_left);
            case 'v':
                return new Tile(TileType.background, GameWorld.sprites.grass_center);
            case 'p':
                return new Tile(TileType.background, GameWorld.sprites.grass_right);
            case 'n':
                return new Tile(TileType.background, GameWorld.sprites.window);
            case '/':
                return new Tile(TileType.background, GameWorld.sprites.big_tree_crown_left);
            case '`':
                return new Tile(TileType.background, GameWorld.sprites.big_tree_crown_right);
            case '<':
                return new Tile(TileType.background, GameWorld.sprites.big_tree_stem_left);
            case '>':
                return new Tile(TileType.background, GameWorld.sprites.big_tree_stem_right);
            case '[':
                return new Tile(TileType.pipe_left);
            case ']':
                return new Tile(TileType.pipe_right);
            case '#':
                return new Tile(TileType.wall, GameWorld.sprites.brick(this.levelData.brickColor));
            case 'U':
                return new Tile(TileType.wall, GameWorld.sprites.wood(this.levelData.woodColor));
            case 'N':
                return new Tile(TileType.wall, GameWorld.sprites.xblock(this.levelData.xblockColor));
            case 'I':
                return new Tile(TileType.wall, GameWorld.sprites.stone);
            case 'J':
                return new Tile(TileType.wall, GameWorld.sprites.note);
            case '?':
                return new Tile(TileType.wall);
            case '=':
                return new Tile(TileType.wall, GameWorld.sprites.block);
            case 'D':
                return new Tile(TileType.wall, GameWorld.sprites.donut);
            case 'V':
                return new Tile(TileType.pin, GameWorld.sprites.pin_downward);
            case 'A':
                return new Tile(TileType.pin, GameWorld.sprites.pin_upward);
            case '*':
                return new Tile(TileType.star, GameWorld.sprites.star);
            case 'X':
                return new Tile(TileType.background, GameWorld.sprites.exit);
            case 'x':
                return new Tile(TileType.background, GameWorld.sprites.exit_bar);
            default:
                return new Tile(TileType.background);
        }
    }

    createObject(char: string, tile: Tile) : AnimatedSprite {
        switch (char) {
            case 'o':
                return new Coin(tile.region.center);
            case '.':
                return new Coin(Vector2.minus(tile.region.center, new Vector2(0, 2 * GameData.tileHeight)));
            case '?':
                return new Quest(tile, 'coin');
            default:
                return null;
        }
    }

    loadTiles(tiles) {
        var tileGrid = new TileGrid(tiles.length, tiles[0].length, GameData.tileWidth, GameData.tileHeight);
        this.add(tileGrid);
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var char = tiles[row][col];
                var tile = this.createTile(char, row, col);
                tile['char'] = char;
                tileGrid.addAt(tile, row, col);

                if (tile.image instanceof Animation) {
                    this.addAnimation(tile, <Animation>(tile.image));
                    tile.image = null;
                }

                var object = this.createObject(char, tile);
                if (object != null) {
                    this.add(object);
                }
            }
        }
        // fill ground and trees
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var tile = tileGrid.at(row, col);
                if (tile.type == TileType.ground_top_left || tile.type == TileType.ground_top_right) {
                    this.fixGroundCorner(tile);
                }
                else if (tile.image == GameWorld.sprites.big_tree_crown_left) {
                    if (tile.west.image == GameWorld.sprites.big_tree_stem_left) {
                        this.overlayTileImage(tile, GameWorld.sprites.big_tree_stem_right);
                    }
                } else if (tile.image == GameWorld.sprites.big_tree_crown_right) {
                    if (tile.east.image == GameWorld.sprites.big_tree_stem_right) {
                        this.overlayTileImage(tile, GameWorld.sprites.big_tree_stem_left);
                    }
                }
            }
        }
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var tile = tileGrid.at(row, col);
                switch (tile.type) {
                    case TileType.ground_top:
                    case TileType.ground_top_left:
                    case TileType.ground_top_right:
                        this.fillGroundGap(tile);
                        break;
                    case TileType.ground_brick:
                        if (tile.east == null || tile.east.type != TileType.ground_brick) {
                            tile.image = GameWorld.sprites.brick_short(this.levelData.groundColor);
                        }
                        else if (tile.east != null && tile.east.type == TileType.ground_brick) {
                            if (tile.west == null || tile.west.type != TileType.ground) {
                                if ((row + col) % 2 == 1) {
                                    tile.image = GameWorld.sprites.brick_short(this.levelData.groundColor);
                                } else {
                                    tile.image = GameWorld.sprites.brick_long(this.levelData.groundColor);
                                    tile.east.type = TileType.ground;
                                    if (tile.west == null && tile.south != null && tile.south.type == TileType.ground_brick) {
                                        tile.south.image = GameWorld.sprites.brick_short(this.levelData.groundColor);
                                        tile.south.type = TileType.ground;
                                    }
                                }
                            } else {
                                tile.image = GameWorld.sprites.brick_long(this.levelData.groundColor);
                                tile.east.type = TileType.ground;
                            }
                        }
                        tile.type = TileType.ground;
                        break;
                    case TileType.tree_crown:
                        this.fillTree(tile, GameWorld.sprites.tree_stem(this.levelData.treeColor));
                        if (this.levelData.treeColor == "yellow") {
                            this.addAnimation(tile.west, GameWorld.sprites.tree_crown_left);
                            this.addAnimation(tile.east, GameWorld.sprites.tree_crown_right);
                            this.addAnimation(tile.north, GameWorld.sprites.tree_crown_top);
                        }
                        break;
                    case TileType.waterfall:
                        if (tile.south != null && tile.south.type == TileType.waterfall) {
                            this.addAnimation(tile, GameWorld.sprites.waterfall(this.levelData.waterfallColor));
                        }
                        break;
                    case TileType.lava:
                        if (tile.south != null && tile.south.type == TileType.lava) {
                            var animatedSprite = GameWorld.sprites.lava_top(col);
                            animatedSprite.position = tile.position;
                            this.lavas.push(animatedSprite);
                            tile.south.image = GameWorld.sprites.lava;
                        }
                        break;
                    case TileType.pipe_left:
                        if (tile.north == null) {
                            this.addPipe(tile, Orientation.downward);
                        } else if (tile.north != null && tile.north.type != TileType.pipe_left) {
                            this.addPipe(tile, Orientation.upward);
                        }
                        break;
                }
            }
        }
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var tile = tileGrid.at(row, col);
                if (this.isGroudTop(tile)) {
                    this.fixGroundTileType(tile);
                }
            }
        }
        // add walls
        if (this.levelData.walls) {
            for (var row = 0; row < tileGrid.rows; row += tileGrid.rows - 1) {
                for (var col = 0; col < tileGrid.cols; col++) {
                    this.addBlock(tileGrid.at(row, col));
                }
            }
            for (var row = 1; row < tileGrid.rows - 1; row++) {
                for (var col = 0; col < tileGrid.cols; col += tileGrid.cols - 1) {
                    this.addBlock(tileGrid.at(row, col));
                }
            }
        }
        this.tiles = tileGrid;
    }

    addAnimation(tile: Tile, animation: Animation) {
        var sprite = AnimatedSprite.Create(animation);
        sprite.position = tile.position;
        this.add(sprite);
    }

    addPipe(tile: Tile, orientation: Orientation) {
        var length = 0;
        var curTile = tile;
        while (curTile != null && curTile.type == TileType.pipe_left) {
            length++;
            curTile = curTile.south;
        }
        var pipe = new Pipe(length, orientation, this.levelData.pipeColor);
        pipe.position = tile.position;
        var indicator = orientation == Orientation.upward ? tile.north : curTile;
        if (indicator['char'] == '+') {
            pipe.in = indicator.east['char'];
        } else if (indicator['char'] == '-') {
            pipe.out = indicator.east['char'];
        }
        this.pipes.push(pipe);
    }

    findPipe(char: string): Pipe {
        for (var i = 0; i < this.pipes.length; i++) {
            var pipe = this.pipes[i];
            if (pipe.out == char) {
                return pipe;
            }
        }
        return null;
    }

    addBlock(tile: Tile) {
        tile.type = TileType.wall;
        var block = new StaticImage(GameWorld.sprites.stone);
        block.position = tile.position;
        this.add(block);
    }

    overlayTileImage(tile: Tile, backgroundImage: SpriteImage) {
        var overlay_image = new StaticImage(tile.image);
        overlay_image.mirror = tile.mirror;
        overlay_image.position = tile.position;
        this.add(overlay_image);
        tile.image = backgroundImage;
    }

    fillTree(tile: Tile, image: SpriteImage) {
        tile = tile.south;
        while (tile != null && tile.type == TileType.background) {
            tile.image = image;
            tile = tile.south;
        }
    }

    isGroudTop(tile: Tile) {
        return tile.type == TileType.ground_top_left || tile.type == TileType.ground_top || tile.type == TileType.ground_top_right;
    }

    fixGroundCorner(tile: Tile) {
        tile = tile.south;
        while (tile != null) {
            if (tile.type == TileType.ground) {
                var north = tile.north;
                if (north.type == TileType.ground_edge_left || north.type == TileType.ground_top_left) {
                    tile.image = GameWorld.sprites.ground_corner(this.levelData.groundColor);
                } else if (north.type == TileType.ground_edge_right || north.type == TileType.ground_top_right) {
                    tile.image = GameWorld.sprites.ground_corner(this.levelData.groundColor);
                    tile.mirror = true;
                }
            } else if (this.isGroudTop(tile)) {
                break;
            }
            tile = tile.south;
        }
    }

    fixGroundTileType(topTile: Tile) {
        var solid = true;
        var tile = topTile.south;
        var tiles: Tile[] = [];
        while (tile != null) {
            if (tile.type == TileType.ground || tile.type == TileType.ground_edge_left || tile.type == TileType.ground_edge_right) {
                tiles.push(tile);
            }
            else if (this.isGroudTop(tile)) {
                solid = false;
                tiles.forEach((theTile) => {
                    theTile.type = TileType.background;
                });
                break;
            }
            tile = tile.south;
        }
        if (solid) {
            topTile.type = TileType.ground;
        }
    }

    fillGroundGap(tile: Tile) {
        var under_ground = GameWorld.sprites.under_ground(this.levelData.groundColor);
        var ground_top = GameWorld.sprites.ground_top(this.levelData.groundColor);
        tile = tile.south;
        while (tile != null) {
            if (tile.type == TileType.ground_edge_left && tile.west.type == TileType.ground ||
                tile.type == TileType.ground_edge_right && tile.east.type == TileType.ground ||
                tile.type == TileType.ground_top_left && tile.west.type == TileType.ground ||
                tile.type == TileType.ground_top_right && tile.east.type == TileType.ground) {
                this.overlayTileImage(tile, under_ground);
            }
            else if (tile.type == TileType.ground_edge_left && tile.west.type == TileType.ground_top ||
                tile.type == TileType.ground_edge_right && tile.east.type == TileType.ground_top) {
                this.overlayTileImage(tile, ground_top);
            }

            if (tile.type == TileType.background) {
                tile.image = under_ground;
                tile.type = TileType.ground;
            } else if (this.isGroudTop(tile)) {
                break;
            }
            tile = tile.south;
        }
    }
} 