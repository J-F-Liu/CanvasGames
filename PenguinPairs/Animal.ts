class Animal extends Sprite {
    controllable: boolean = true;
    selected: boolean = false;
    tile: Tile;
    direction: number;

    static canReach(tile: Tile) {
        return tile.type != TileType.hill;
    }

    update(frameSpan: number) {
        if (!this.visible) {
            return;
        }
        super.update(frameSpan);
        if (Mouse.left.pressed) {
            this.selected = this.controllable && this.velocity.isZero && this.bound.contains(Mouse.position);
        }
        if (!this.velocity.isZero) {
            var position = this.position.copy();
            if (this.direction == Direction.east) {
                position.x += this.tile.grid.cellWidth;
            } else if (this.direction == Direction.south) {
                position.y += this.tile.grid.cellHeight;
            }
            var enteringTile = this.tile.grid.find(position);
            if (enteringTile == null) {
                this.fall();
                Sound.Play(Game.audios['lost'], GameWorld.options.volume);
                return;
            }

            var stayTile = enteringTile.neighbour(Directions.opposite(this.direction));
            switch (enteringTile.type) {
                case TileType.hill:
                    this.stop(stayTile);
                    break;
                case TileType.water:
                    this.fall();
                    Sound.Play(Game.audios['lost'], GameWorld.options.volume);
                    break;
                case TileType.trap:
                    var animal = GameWorld.currentLevel.findAnimalAt(enteringTile);
                    if (animal instanceof Penguin) {
                        if (this instanceof Penguin && Penguin.isPair(<Penguin>this, animal)) {
                            this.fall();
                            animal.fall();
                            GameWorld.currentLevel.addPair(<Penguin>this, enteringTile);
                        } else {
                            this.stop(stayTile);
                        }
                    } else {
                        this.trap();
                        this.stop(enteringTile);
                    }
                    break;
                case TileType.ice:
                    var animal = GameWorld.currentLevel.findAnimalAt(enteringTile);
                    if (animal instanceof Shark) {
                        this.fall();
                        animal.fall();
                        Sound.Play(Game.audios['eat'], GameWorld.options.volume);
                    } else if (animal instanceof Seal) {
                        this.stop(stayTile);
                    } else if (animal instanceof Penguin) {
                        if (this instanceof Penguin && Penguin.isPair(<Penguin>this, animal)) {
                            this.fall();
                            animal.fall();
                            GameWorld.currentLevel.addPair(<Penguin>this, enteringTile);
                        } else {
                            this.stop(stayTile);
                        }
                    }
                    break;
            }
        }
    }

    trap() {
        this.controllable = false;
    }

    fall() {
        this.visible = false;
        this.selected = false;
        this.velocity = Vector2.zero;
    }

    stop(tile: Tile) {
        this.velocity = Vector2.zero;
        this.tile = tile;
        this.position = tile.position;
    }
}

class Penguin extends Animal {
    static colors = "brgyopm";
    constructor(public color: string, trapped: boolean) {
        super(new SpriteSheet(Game.images['penguin@8'], 1, 8, Penguin.colors.indexOf(color)));
        if (trapped) {
            this.trap();
        }
    }

    trap() {
        super.trap();
        this.image = new SpriteSheet(Game.images['penguin_boxed@8'], 1, 8, Penguin.colors.indexOf(this.color))
    }

    get isMulticolor() {
        return this.color == 'm';
    }

    static isPair(p1: Penguin, p2: Penguin) {
        return p1.isMulticolor || p2.isMulticolor || p1.color == p2.color;
    }
}

class Seal extends Animal {
    constructor() {
        super(GameWorld.sprites.seal);
    }
}

class Shark extends Animal {
    constructor() {
        super(GameWorld.sprites.shark);
        this.controllable = false;
    }
}