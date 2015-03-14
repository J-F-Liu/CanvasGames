enum TileType {
    ice, water, hill, trap
}

class Level extends GameObjectGroup {
    tip: string;
    goal: number;
    tiles: TileGrid;
    animals: Animal[] = [];
    _hasMoves: boolean = false;

    eastArrow = new Arrow(Direction.east);
    southArrow = new Arrow(Direction.south);
    westArrow = new Arrow(Direction.west);
    northArrow = new Arrow(Direction.north);
    hintArrow: Arrow;
    pairList: PairList;
    tipLabel: Label;

    constructor(public levelIndex: number) {
        super();
        var levelData = GameData.levels[levelIndex];
        this.tip = levelData.tip;
        this.goal = levelData.goal;
        this.loadTiles(levelData.tiles);
        var dirction_name = <string>GameData.directions[levelData.hint_arrow_direction];
        var hint_arrow_direction = Direction[dirction_name];
        this.hintArrow = new Arrow(hint_arrow_direction);
        this.hintArrow.state = "hint";
        var hint_tile = this.tiles.at(levelData.hint_arrow_y, levelData.hint_arrow_x);
        this.hintArrow.position = hint_tile.position;
        this.hintArrow.animal = this.findAnimalAt(hint_tile.neighbour(Directions.opposite(hint_arrow_direction)));
        this.pairList = new PairList(this.goal);
        this.pairList.position.set(20, 15);
        this.add(this.eastArrow, this.northArrow, this.southArrow, this.westArrow, this.hintArrow, this.pairList);
        if (GameWorld.options.showTip && this.tip != null && this.tip.length > 0) {
            this.tipLabel = new Label(this.tip, Color.darkBlue, "Arial", "24px");
            this.tipLabel.centerTo(GameWorld.sprites.frame_tip.region);
            this.add(GameWorld.sprites.frame_tip);
            this.add(this.tipLabel);
        }
        this.hasMoves = false;
    }

    set hasMoves(value: boolean) {
        if (value) {
            if (!this._hasMoves) {
                GameWorld.sprites.button_hint.visible = false;
                GameWorld.sprites.button_retry.visible = true;
                this.hintArrow.visible = false;
            }
        } else {
            GameWorld.sprites.button_hint.visible = true;
            GameWorld.sprites.button_retry.visible = false;
        }
        this._hasMoves = value;
    }

    get selectedAnimal() {
        for (var i = 0; i < this.animals.length; i++) {
            var animal = this.animals[i];
            if (animal.visible && animal.selected) {
                return animal;
            }
        }
        return null;
    }

    findAnimalAt(tile: Tile): Animal {
        for (var i = 0; i < this.animals.length; i++) {
            var animal = this.animals[i];
            if (animal.visible && animal.tile.equals(tile)) {
                return animal;
            }
        }
        return null;
    }

    addPair(penguin: Penguin, tile: Tile) {
        var flyPenguin = new Particle(penguin.image, 1);
        flyPenguin.onEmit = function () {
            flyPenguin.position = tile.position;
            flyPenguin.velocity = Vector2.minus(GameWorld.currentLevel.pairList.dockPosition, flyPenguin.position);
        };
        flyPenguin.onFly = function () {
            flyPenguin.scale = 1 - 0.4 * flyPenguin.progress;
        };
        flyPenguin.onDie = function () {
            GameWorld.currentLevel.pairList.addPair(penguin.color);
        };
        this.add(flyPenguin);
        flyPenguin.emit();
        Sound.Play(Game.audios['pair'], GameWorld.options.volume);
    }

    update(frameSpan: number) {
        super.update(frameSpan);
        var animal = this.selectedAnimal;
        this.eastArrow.indicate(animal);
        this.southArrow.indicate(animal);
        this.westArrow.indicate(animal);
        this.northArrow.indicate(animal);

        if (this.pairList.finished) {
            GameWorld.sprites.level_finish.visible = true;
            var score = this.levelIndex + 1;
            if (score > GameWorld.score) {
                GameWorld.scores.add(score);
            }
            Sound.Play(Game.audios['won'], GameWorld.options.volume);
        }
    }

    createTile(char: string, row: number, col: number): Tile {
        switch (char) {
            case '#':
                return new Tile(TileType.hill, GameWorld.sprites.hill);
            case 'R':
            case 'B':
            case 'G':
            case 'O':
            case 'P':
            case 'Y':
            case 'M':
            case 'X':
                return new Tile(TileType.trap, GameWorld.sprites.trap);
            case ' ':
                return new Tile(TileType.water);
            default:
                return new Tile(TileType.ice, Maths.even(row + col) ? GameWorld.sprites.ice_white : GameWorld.sprites.ice_blue);
        }
    }

    createAnimal(char: string): Animal {
        switch (char) {
            case 'r':
            case 'b':
            case 'g':
            case 'o':
            case 'p':
            case 'y':
            case 'm':
                return new Penguin(char, false);
            case 'R':
            case 'B':
            case 'G':
            case 'O':
            case 'P':
            case 'Y':
            case 'M':
                return new Penguin(char.toLowerCase(), true);
            case 's':
                return new Seal();
            case '@':
                return new Shark();
            default:
                return null;
        }
    }

    loadTiles(tiles: string[]) {
        var tileGrid = new TileGrid(tiles.length, tiles[0].length, 73, 72);
        tileGrid.position.set((Game.viewport.width - tileGrid.width) / 2, 100);
        this.add(tileGrid);
        for (var row = 0; row < tileGrid.rows; row++) {
            for (var col = 0; col < tileGrid.cols; col++) {
                var char = tiles[row][col];
                var tile = this.createTile(char, row, col);
                tileGrid.addAt(tile, row, col);

                var animal = this.createAnimal(char);
                if (animal != null) {
                    animal.tile = tile;
                    animal.position = tile.position;
                    this.animals.push(animal);
                }
            }
        }
        this.tiles = tileGrid;
        this.addArray(this.animals);
    }
} 