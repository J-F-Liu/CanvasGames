class Enemy extends AnimatedSprite {
}

class Rocket extends Enemy {
    spawnTime: number;
    constructor(public startPosition: Vector2, public direction: Direction) {
        super({
            "default": new Animation(Game.images['rocket@3'], 1, 3, true)
        }, "default");
        this.mirror = direction == Direction.left;
        this.origin = new Vector2(this.width / 2, this.height);
        this.reset();
    }

    reset() {
        this.visible = false;
        this.position = this.startPosition.copy();
        this.velocity = Vector2.zero;
        this.spawnTime = Math.random() * 5;
    }

    update(frameSpan: number) {
        if (this.spawnTime > 0) {
            this.spawnTime -= frameSpan;
            if (this.spawnTime <= 0) {
                this.visible = true;
                this.velocity = Vector2.times(600, Directions.vector(this.direction));
            }
            return;
        }
        super.update(frameSpan);
        if (this.isOutside(Game.viewport)) {
            this.reset();
        } else if (this.collideWith(GameWorld.player)) {
            GameWorld.player.die();
        }
    }
}

class Turtle extends Enemy {
    waitTime: number;
    sneezing: boolean;
    constructor(startPosition: Vector2) {
        super({
            "sneeze": new Animation(Game.images['sneeze@9'], 1, 9, false),
            "idle": new Animation(Game.images['turtle_idle'], 1, 1)
        }, "idle");
        this.origin = new Vector2(this.image.width / 2, this.image.height - 25);
        this.position = startPosition;
        this.reset();
    }

    reset() {
        this.waitTime = 5;
        this.sneezing = false;
    }

    get left(): number {
        return this.position.x - this.width / 2;
    }

    get top(): number {
        return this.position.y - this.height;
    }

    get width() {
        return this.sneezing ? 160 : 120;
    }

    get height() {
        return this.sneezing ? 120 : 80;
    }

    update(frameSpan: number) {
        if (this.waitTime > 0) {
            this.waitTime -= frameSpan;
        } else {
            this.sneezing = !this.sneezing;
            this.waitTime = 5;
        }
        if (this.sneezing) {
            this.animation = "sneeze";
        } else {
            this.animation = "idle";
        }
        super.update(frameSpan);
        if (this.collideWith(GameWorld.player)) {
            if (this.sneezing) {
                GameWorld.player.die();
            } else if (GameWorld.player.velocity.y > 0 && GameWorld.player.alive) {
                GameWorld.player.jump(1500);
            }
        }
    }
}

class Sparky extends Enemy {
    idleTime: number;
    electrocute: boolean;
    constructor(public startPosition: Vector2) {
        super({
            "electrocute": new Animation(Game.images['electrocute@6x5'], 5, 6, false),
            "idle": new Animation(Game.images['sparky_idle'], 1, 1)
        }, "idle");
        this.origin = new Vector2(this.image.width / 2, this.image.height - 100);
        this.position.x = startPosition.x;
        this.reset();
    }

    reset() {
        this.position.y = this.startPosition.y;
        this.velocity = Vector2.zero;
        this.idleTime = Math.random() * 5;
        this.electrocute = false;
    }

    get left(): number {
        return this.position.x - this.width / 2;
    }

    get top(): number {
        return this.position.y - this.width / 2;
    }

    get width() {
        return this.electrocute ? 130 : 72;
    }

    get height() {
        return this.electrocute ? 140 : 96;
    }

    update(frameSpan: number) {
        if (this.idleTime > 0) {
            this.idleTime -= frameSpan;
            this.animation = "idle";
            if (this.idleTime <= 0) {
                this.velocity.y = 300;
                this.electrocute = true;
            }
        } else {
            this.animation = "electrocute";
            if (this.velocity.y != 0) {
                // falling down or going up
                if (this.position.y >= this.startPosition.y + 120) {
                    this.velocity.y = 0;
                } else if (this.position.y <= this.startPosition.y) {
                    this.reset();
                }
            }
            else if ((<Animation>this.image).ended) {
                this.velocity.y = -60;
                this.electrocute = false;
            }
        }

        super.update(frameSpan);
        if (this.electrocute && this.collideWith(GameWorld.player)) {
            GameWorld.player.die();
        }
    }
}

enum PatrolType { regular, random, following }

class Flame extends Enemy {
    waitTime: number = 0;
    constructor(public startPosition: Vector2, public patrolType: PatrolType) {
        super({
            "default": new Animation(Game.images['flame@9'], 1, 9, true)
        }, "default");
        this.origin = new Vector2(this.image.width / 2, this.image.height);
        this.position = startPosition;
        this.velocity.x = 120;
    }

    turnAround(speed: number = 120) {
        this.mirror = !this.mirror;
        this.velocity.x = this.mirror ? -speed : speed;
    }

    update(frameSpan: number) {
        if (this.waitTime > 0) {
            this.waitTime -= frameSpan;
            if (this.waitTime <= 0) {
                this.turnAround();
            }
        } else {
            var faceX = this.mirror ? this.left : this.right;
            var bottomTile = GameWorld.currentLevel.tiles.find(new Vector2(faceX, this.position.y));
            if (bottomTile == null || bottomTile.type == TileType.background ||
                bottomTile.north == null || bottomTile.north.type == TileType.wall) {
                this.waitTime = 0.5;
                this.velocity.x = 0;
            }
            if (this.patrolType == PatrolType.random && Math.random() < 0.01) {
                this.turnAround(Math.random() * 300);
            }
            if (this.patrolType == PatrolType.following) {
                var direction = GameWorld.player.position.x - this.position.x;
                if (Maths.sign(direction) !== Maths.sign(this.velocity.x) &&
                    GameWorld.player.velocity.x !== 0 && this.velocity.x !== 0) {
                    this.turnAround();
                }
            }
        }

        super.update(frameSpan);
        if (this.collideWith(GameWorld.player)) {
            GameWorld.player.die();
        }
    }
}