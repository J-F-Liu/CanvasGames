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
                return;
            }

            switch (enteringTile.type) {
                case TileType.hill:
                    this.stopBefore(enteringTile);
                    break;
                case TileType.water:
                    this.fall();
                    break;
                case TileType.trap:
                    var animal = GameWorld.currentLevel.findAnimalAt(enteringTile);
                    if (animal instanceof Penguin) {
                        this.makePair(animal, enteringTile);
                    } else {
                        this.trap();
                        this.stopAt(enteringTile);
                    }
                    break;
                case TileType.ice:
                    var animal = GameWorld.currentLevel.findAnimalAt(enteringTile);
                    if (animal instanceof Penguin) {
                        this.makePair(animal, enteringTile);
                    } else if (animal instanceof Seal) {
                        this.stopBefore(enteringTile);
                    } else if (animal instanceof Shark) {
                        this.hide();
                        animal.hide();
                        Sound.Play(Game.audios['eat'], GameWorld.options.volume);
                    }
                    break;
            }
        }
    }

    trap() {
        this.controllable = false;
    }

    fall() {
        this.hide();
        Sound.Play(Game.audios['lost'], GameWorld.options.volume);
    }

    hide() {
        this.visible = false;
    }

    stopBefore(tile: Tile) {
        var stayTile = tile.neighbour(Directions.opposite(this.direction));
        this.stopAt(stayTile);
    }

    stopAt(tile: Tile) {
        this.tile = tile;
        this.position = tile.position;
        this.velocity = Vector2.zero;
    }

    makePair(penguin: Penguin, tile: Tile) {
        if (this instanceof Penguin && Penguin.isPair(<Penguin>this, penguin)) {
            this.hide();
            penguin.hide();
            GameWorld.currentLevel.addPair(<Penguin>this, tile);
        } else {
            this.stopBefore(tile);
        }
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