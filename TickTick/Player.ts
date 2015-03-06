class Player extends AnimatedSprite {
    alive: boolean = true;
    exploded: boolean = false;
    win: boolean = false;
    speed: number = 400;
    onGround: boolean = true;
    walkingOnIce: boolean = false;
    walkingOnHot: boolean = false;
    radius: number = 44;
    highestPos: number;
    timer: Timer;
    constructor() {
        super({
            "idle": new Animation(Game.images['idle'], 1, 1),
            "run": new Animation(Game.images['run@13'], 1, 13, true, 0.05),
            "jump": new Animation(Game.images['jump@14'], 1, 14, false, 0.05),
            "celebrate": new Animation(Game.images['celebrate@14'], 1, 14, false, 0.05),
            "explode": new Animation(Game.images['explode@5x5'], 5, 5, false, 0.04),
            "die": new Animation(Game.images['die@5'], 1, 5),
        }, "idle");
        this.origin = new Vector2(60, this.image.height - this.radius);
        this.timer = new Timer();
    }

    reset() {
        this.alive = true;
        this.win = false;
        this.exploded = false;
        this.onGround = true;
        this.velocity = Vector2.zero;
        this.timer.reset();
    }

    get left(): number {
        return this.position.x - this.radius;
    }

    get top(): number {
        return this.position.y - this.radius;
    }

    get width(): number {
        return this.radius * 2;
    }

    get height(): number {
        return this.radius * 2;
    }

    get bound() {
        return new Circle(this.position.x, this.position.y, this.radius);
    }

    update(frameSpan: number) {
        if (this.alive) {
            if (!this.win) {
                this.speed = 400;
                if (this.walkingOnIce) {
                    this.speed *= 1.5;
                    this.velocity.x = Maths.sign(this.velocity.x) * this.speed;
                } else if (this.onGround) {
                    this.velocity.x = 0;
                }
                if (Keyboard.down(Keys.left)) {
                    this.velocity.x = -this.speed;
                } else if (Keyboard.down(Keys.right)) {
                    this.velocity.x = this.speed;
                }
                if (Keyboard.pressed(Keys.space) && this.onGround) {
                    this.jump();
                }

                if (this.onGround) {
                    if (this.velocity.x == 0) {
                        this.animation = "idle";
                    } else {
                        this.mirror = this.velocity.x < 0;
                        this.animation = "run";
                    }
                } else if (this.velocity.y < 0) {
                    this.animation = "jump";
                }

                if (this.top >= Game.viewport.bottom) {
                    this.fall();
                } else {
                    this.velocity.add(Physics.gravity(3300, frameSpan));
                    this.handleCollisions();
                }
            }
        } else if (!this.exploded) {
            this.velocity.add(Physics.gravity(3300, frameSpan));
        }
        super.update(frameSpan);
    }

    jump(speed: number = 1100) {
        this.velocity.y = -speed;
        Sound.Play(Game.audios['player_jump'], GameWorld.options.volume);
    }

    over() {
        this.alive = false;
        this.timer.running = false;
        GameWorld.sprites.overlay_gameover.visible = true;
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

    explode() {
        if (this.alive && !this.win) {
            this.over();
            this.exploded = true;
            this.velocity = Vector2.zero;
            this.animation = "explode";
            Sound.Play(Game.audios['player_explode'], GameWorld.options.volume);
        }
    }

    startAt(tile: Tile) {
        this.position.x = tile.region.center.x;
        this.position.y = tile.region.bottom - this.radius - 1;
        this.highestPos = this.position.y;
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

    handleCollisions() {
        this.onGround = false;
        var tiles = GameWorld.currentLevel.tiles;
        var deltaX: number;
        var deltaY: number;
        if (this.velocity.x < 0) {
            this.position.x -= 1;
            var topleftTile = tiles.find(new Vector2(this.left - 1, this.top));
            var leftTile = tiles.find(new Vector2(this.left - 1, this.position.y));
            var bottomleftTile = tiles.find(new Vector2(this.left - 1, this.bottom));
            if (this.sideCollideWith(topleftTile) || this.sideCollideWith(leftTile) || this.sideCollideWith(bottomleftTile)) {
                var forcedX = this.tileBoundary(topleftTile != null ? topleftTile : bottomleftTile, Direction.left) + this.radius + 1;
                deltaX = forcedX - this.position.x - 1;
            }
            this.position.x += 1;
        }
        if (this.velocity.x > 0) {
            this.position.x += 1;
            var toprightTile = tiles.find(new Vector2(this.right + 1, this.top));
            var rightTile = tiles.find(new Vector2(this.right + 1, this.position.y));
            var bottomrightTile = tiles.find(new Vector2(this.right + 1, this.bottom));
            if (this.sideCollideWith(toprightTile) || this.sideCollideWith(rightTile) || this.sideCollideWith(bottomrightTile)) {
                var forcedX = this.tileBoundary(toprightTile != null ? toprightTile : bottomrightTile, Direction.right) - this.radius - 1;
                deltaX = forcedX - this.position.x + 1;
            }
            this.position.x -= 1;
        }
        if (this.velocity.y < 0) {
            this.position.y -= 1;
            var topleftTile = tiles.find(new Vector2(this.left, this.top - 1));
            var topcenterTile = tiles.find(new Vector2(this.position.x, this.top - 1));
            var toprightTile = tiles.find(new Vector2(this.right, this.top - 1));
            if (this.headCollideWith(topleftTile) || this.headCollideWith(topcenterTile) || this.headCollideWith(toprightTile)) {
                var forcedY = this.tileBoundary(topleftTile != null ? topleftTile : toprightTile, Direction.up) + this.radius + 1;
                deltaY = forcedY - this.position.y - 1;
            }
            this.position.y += 1;
        }
        if (this.velocity.y > 0) {
            this.position.y += 1;
            var bottomleftTile = tiles.find(new Vector2(this.left, this.bottom + 1));
            var bottomcenterTile = tiles.find(new Vector2(this.position.x, this.bottom + 1));
            var bottomrightTile = tiles.find(new Vector2(this.right, this.bottom + 1));
            if (this.footCollideWith(bottomleftTile) || this.footCollideWith(bottomcenterTile) || this.footCollideWith(bottomrightTile)) {
                var forcedY = this.tileBoundary(bottomleftTile != null ? bottomleftTile : bottomrightTile, Direction.down) - this.radius - 1;
                deltaY = forcedY - this.position.y + 1;
            }
            this.position.y -= 1;
        }
        //console.log(this.position.y, this.highestPos, deltaX, deltaY);
        if (deltaX != undefined && deltaY != undefined && deltaY != 0 && deltaX != 0) {
            if (Math.abs(deltaX) < Math.abs(deltaY)) {
                this.handleHorizontalCollision(deltaX);
            } else {
                this.handleVerticalCollision(deltaY);
            }
        } else {
            if (deltaX != undefined) {
                this.handleHorizontalCollision(deltaX);
            }
            if (deltaY != undefined) {
                this.handleVerticalCollision(deltaY);
            }
        }

        if (this.position.y < this.highestPos) {
            this.highestPos = this.position.y;
        }

        if (this.onGround) {
            var bottomTile = GameWorld.currentLevel.tiles.find(new Vector2(this.position.x, this.bottom + 2));
            this.walkingOnHot = bottomTile.type == TileType.platform_hot || bottomTile.type == TileType.wall_hot;
            this.walkingOnIce = bottomTile.type == TileType.platform_ice || bottomTile.type == TileType.wall_ice;
        }
    }

    handleHorizontalCollision(deltaX: number) {
        this.position.x += deltaX;
        this.velocity.x = 0;
    }

    handleVerticalCollision(deltaY: number) {
        if (this.velocity.y > 0) {
            if (this.highestPos <= this.position.y + deltaY) {
                this.onGround = true;
                this.position.y += deltaY;
                this.highestPos = this.position.y;
                this.velocity.y = 0;
            }
        } else {
            this.position.y += deltaY;
            this.velocity.y = 0;
        }
    }

    sideCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.wall:
                case TileType.wall_hot:
                case TileType.wall_ice:
                    return this.region.hasIntersect(tile.region);
                case TileType.exit:
                    this.checkFinish(tile);
                    return false;
                default:
                    return false;
            }
        }
        return this.left <= 0 || this.right >= GameWorld.currentLevel.tiles.width;
    }

    headCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.wall:
                case TileType.wall_hot:
                case TileType.wall_ice:
                    return this.region.hasIntersect(tile.region);
                case TileType.exit:
                    this.checkFinish(tile);
                    return false;
            }
        }
        return false;
    }

    footCollideWith(tile: Tile) {
        if (tile != null) {
            switch (tile.type) {
                case TileType.platform:
                case TileType.platform_hot:
                case TileType.platform_ice:
                case TileType.wall:
                case TileType.wall_hot:
                case TileType.wall_ice:
                    return this.region.hasIntersect(tile.region);
                case TileType.exit:
                    this.checkFinish(tile);
                    return false;
            }
        }
        return false;
    }

    checkFinish(tile: Tile) {
        if (GameWorld.currentLevel.finished) {
            if (this.bound.hasIntersect(tile.region)) {
                this.win = true;
                this.timer.running = false;
                this.animation = "celebrate";
                this.moveTo(this.speed, new Vector2(tile.region.center.x, tile.region.bottom - this.radius - 26));
                Sound.Play(Game.audios['player_won'], GameWorld.options.volume);
                GameWorld.sprites.overlay_welldone.visible = true;
                var score = GameWorld.currentLevel.levelIndex + 1;
                if (score > GameWorld.score) {
                    GameWorld.scores.add(score);
                }
            }
        }
    }
}