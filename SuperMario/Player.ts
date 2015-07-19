class Player extends AnimatedSprite {
    alive: boolean = true;
    exploded: boolean = false;
    win: boolean = false;
    speed: number = 360;
    maxSpeed: number = GameData.tileHeight * 45;
    coins: number = 0;
    onGround: boolean = true;
    transporting: boolean = false;
    highestPos: number;
    tiles: TileGrid;
    oldPosition: Vector2;
    constructor() {
        super({
            "idle": new Animation(Game.images['sprites'], 1, 1, new Rectangle(0, 82, 40, 56)),
            "walk": new Animation(Game.images['sprites'], 1, 2, new Rectangle(0, 82, 40, 56), true, 0.16),
            "jump": new Animation(Game.images['sprites'], 1, 2, new Rectangle(80, 82, 40, 56), false, 0.5),
        }, "idle");
        this.origin = new Vector2(this.image.width / 2, this.image.height - 1);
    }

    reset() {
        this.alive = true;
        this.coins = 0;
        this.onGround = false;
        this.transporting = false;
        this.highestPos = this.position.y;
        this.velocity = Vector2.zero;
        this.mirror = true;
    }

    get left(): number {
        return this.position.x - this.width / 2;
    }

    get top(): number {
        return this.position.y - this.height;
    }

    get width(): number {
        return 38;
    }

    get height(): number {
        return 40;
    }

    update(frameSpan: number) {
        if (this.alive) {
            if (this.transporting) {
                super.update(frameSpan);
                return;
            }
            this.oldPosition = this.position.copy();

            this.velocity.x = 0;
            if (Keyboard.down(Keys.left)) {
                this.velocity.x = -this.speed;
            } else if (Keyboard.down(Keys.right)) {
                this.velocity.x = this.speed;
            }
            if (Keyboard.pressed(Keys.space) && this.onGround) {
                this.jump();
            }
            this.velocity.add(Physics.gravity(3200, frameSpan));
            if (this.velocity.y > this.maxSpeed) {
                this.velocity.y = this.maxSpeed;
            }
            super.update(frameSpan);
            this.handleCollisions();

            if (this.top >= Game.viewport.bottom) {
                this.fall();
            } else if (this.onGround) {
                if (this.velocity.x == 0) {
                    this.animation = "idle";
                } else {
                    this.animation = "walk";
                }
            } else if (this.velocity.y < 0) {
                this.animation = "jump";
            }
            if (this.velocity.x != 0) {
                this.mirror = this.velocity.x > 0;
            }
        }

        if (this.velocity.x > 0) {
            if (this.position.x - Game.viewport.x > Game.viewport.width * 0.66) {
                GameWorld.map.scrollRight(this.position.x - this.oldPosition.x);
            }
        } else if (this.velocity.x < 0) {
            if (this.position.x - Game.viewport.x < Game.viewport.width * 0.33) {
                GameWorld.map.scrollLeft(this.oldPosition.x - this.position.x);
            }
        }
        if (this.top < 0 && this.onGround) {
            GameWorld.map.viewport.y = this.top;
            GameWorld.currentLevel.background.position.y = -this.top;
        } else if(this.top > 0) {
            GameWorld.map.viewport.y = 0;
            GameWorld.currentLevel.background.position.y = 0;
        }
        //console.log(oldX, this.position.x, this.position.y, this.velocity.x);
    }

    jump(speed: number = 1100) {
        this.velocity.y = -speed;
        Sound.Play(Game.audios['player_jump'], GameWorld.options.volume);
    }

    over() {
        this.alive = false;
        GameWorld.currentLevel.play();
    }

    fall() {
        this.over();
        Sound.Play(Game.audios['player_fall'], GameWorld.options.volume);
    }

    die() {
        if (this.alive && !this.win) {
            this.over();
            this.animation = "die";
            this.velocity.y = -900;
            Sound.Play(Game.audios['player_die'], GameWorld.options.volume);
        }
    }

    tileBoundary(tile: Tile, direction: Direction) {
        switch (direction) {
            case Direction.left:
                return tile == null ? 0 : tile.region.right;
            case Direction.right:
                return tile == null ? GameWorld.currentLevel.tiles.width : tile.region.left;
            case Direction.up:
                return tile.region.bottom;
            case Direction.down:
                return tile.region.top;
        }
    }

    stopPosition(tile: Tile, direction: Direction) {
        var boundary = this.tileBoundary(tile, direction);
        switch (direction) {
            case Direction.left:
                return boundary + this.width / 2 + 1;
            case Direction.right:
                return boundary - this.width / 2 - 1;
            case Direction.up:
                return boundary + this.height + 1;
            case Direction.down:
                return boundary - 1;
        }
    }

    handleCollisions() {
        this.onGround = false;
        var newPosition = this.position.copy();

        var hasV = this.handleVerticalCollision();
        var hasH = this.handleHorizontalCollision();

        var deltaX = this.position.x - this.oldPosition.x;
        if (hasH && deltaX == 0) {
            this.velocity.x = 0;
            this.position.y = newPosition.y;
            hasV = this.handleVerticalCollision();
        }

        var deltaY = this.position.y - this.oldPosition.y;
        if (hasV && deltaY == 0) {
            this.onGround = this.velocity.y > 0;
            this.velocity.y = 0;
            this.highestPos = this.position.y;
        }
        else if (this.position.y < this.highestPos) {
            this.highestPos = this.position.y;
        }

        //console.log("deltaX=" + deltaX, "deltaY=" + deltaY, "old=" + this.oldPosition, "new=" + this.position, "this=" + this.bound, this.onGround, "velocity=" + this.velocity);

    }

    handleHorizontalCollision() {
        if (this.velocity.x < 0) {
            var topleftTile = this.tiles.find(new Vector2(this.left - 1, this.top));
            var leftTile = this.tiles.find(new Vector2(this.left - 1, this.position.y - this.height / 2));
            var bottomleftTile = this.tiles.find(new Vector2(this.left - 1, this.bottom));
            if (this.sideCollideWith(topleftTile) || this.sideCollideWith(leftTile) || this.sideCollideWith(bottomleftTile)) {
                this.position.x = this.stopPosition(topleftTile != null ? topleftTile : bottomleftTile, Direction.left);
                return true;
            }
        }
        if (this.velocity.x > 0) {
            var toprightTile = this.tiles.find(new Vector2(this.right + 1, this.top));
            var rightTile = this.tiles.find(new Vector2(this.right + 1, this.position.y - this.height / 2));
            var bottomrightTile = this.tiles.find(new Vector2(this.right + 1, this.bottom));
            if (this.sideCollideWith(toprightTile) || this.sideCollideWith(rightTile) || this.sideCollideWith(bottomrightTile)) {
                this.position.x = this.stopPosition(toprightTile != null ? toprightTile : bottomrightTile, Direction.right);
                return true;
            }
        }
        return false;
    }

    handleVerticalCollision() {
        if (this.velocity.y < 0) {
            var topleftTile = this.tiles.find(new Vector2(this.left, this.top - 1));
            var toprightTile = this.tiles.find(new Vector2(this.right, this.top - 1));
            if (this.headCollideWith(topleftTile) || this.headCollideWith(toprightTile)) {
                var tile = topleftTile != null ? topleftTile : toprightTile;
                if (tile != null) {
                    this.position.y = this.stopPosition(tile, Direction.up);
                    return true;
                }
            }
        }
        if (this.velocity.y > 0) {
            var bottomleftTile = this.tiles.find(new Vector2(this.left, this.bottom + 1));
            var bottomrightTile = this.tiles.find(new Vector2(this.right, this.bottom + 1));
            if (this.footCollideWith(bottomleftTile) || this.footCollideWith(bottomrightTile)) {
                var tile = bottomleftTile != null ? bottomleftTile : bottomrightTile;
                if (tile != null) {
                    var destY = this.stopPosition(tile, Direction.down);
                    if (this.highestPos <= destY) {
                        this.position.y = destY;
                        return true;
                    }
                }
            }
        }
        return false;
    }

    sideCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.ground:
                case TileType.wall:
                case TileType.pipe_left:
                case TileType.pipe_right:
                case TileType.ground_edge_left:
                case TileType.ground_edge_right:
                    return this.region.hasIntersect(tile.region);
                default:
                    return false;
            }
        }
        return this.left <= 0 || this.right >= GameWorld.currentLevel.tiles.width;
    }

    headCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.ground:
                case TileType.wall:
                case TileType.pipe_left:
                case TileType.pipe_right:
                    return this.region.hasIntersect(tile.region);
            }
        }
        return false;
    }

    footCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.ground:
                case TileType.wall:
                case TileType.pipe_left:
                case TileType.pipe_right:
                case TileType.ground_top:
                case TileType.ground_top_left:
                case TileType.ground_top_right:
                    return this.region.hasIntersect(tile.region);
            }
        }
        return false;
    }
}