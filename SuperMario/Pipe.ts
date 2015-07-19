enum Orientation { upward, downward }

class Pipe extends TileGrid {
    in: string;
    out: string;

    constructor(public length: number, public orientation: Orientation, color: string) {
        super(length, 1, GameData.tileWidth * 2, GameData.tileHeight);
        if (orientation == Orientation.upward) {
            this.addAt(new Tile(TileType.wall, GameWorld.sprites["pipe_cap_" + color]), 0, 0);
            for (var row = 1; row < length; row++) {
                this.addAt(new Tile(TileType.wall, GameWorld.sprites["pipe_body_" + color]), row, 0);
            }
        } else {
            for (var row = 0; row < length - 1; row++) {
                this.addAt(new Tile(TileType.wall, GameWorld.sprites["pipe_body_" + color]), row, 0);
            }
            this.addAt(new Tile(TileType.wall, GameWorld.sprites["pipe_cap_" + color]), length - 1, 0);
        }
    }

    get towardsPlayer() {
        var player = GameWorld.player;
        return player.left >= this.position.x &&
            player.right <= this.position.x + this.width;
    }

    transportPlayer() {
        var dest = GameWorld.player.position.copy();
        var factor = this.orientation == Orientation.upward ? 1 : -1;
        dest.y += factor * GameWorld.player.height;
        GameWorld.player.transporting = true;
        GameWorld.player.animation = "idle";
        var self = this;
        GameWorld.player.moveTo(dest, 20,() => {
            switch (this.in) {
                case '+':
                    GameWorld.gotoNexLevel();
                    break;
                case 'a':
                    GameWorld.gotoAwardLevel();
                    break;
                default:
                    var pipe = GameWorld.currentLevel.findPipe(self.in)
                    if (pipe != null) {
                        pipe.releasePlayer();
                    } else {
                        GameWorld.gotoAwardLevel(self.in);
                    }
                    break;
            }
        });
    }

    releasePlayer() {
        var start = Vector2.zero;
        var dest = Vector2.zero;
        if (this.orientation == Orientation.upward) {
            dest.set(this.region.center.x, this.position.y - 2);
            start.set(dest.x, dest.y + GameWorld.player.height);
        } else {
            start.set(this.region.center.x, this.position.y + this.height);
            dest.set(start.x, start.y + GameWorld.player.height);
        }
        GameWorld.player.transporting = true;
        GameWorld.player.position = start;
        GameWorld.player.moveTo(dest, 20,() => {
            GameWorld.player.transporting = false;
        });
        Game.viewport.x = Math.max(0, GameWorld.player.position.x - Game.viewport.width / 2);
    }

    update(frameSpan) {
        super.update(frameSpan);
        if (this.in == undefined || GameWorld.player.transporting) {
            return;
        }
        if (this.orientation == Orientation.upward && Keyboard.down(Keys.down)) {
            if (this.towardsPlayer && GameWorld.player.bottom - this.position.y < 3) {
                this.transportPlayer();
            }
        } else if (this.orientation == Orientation.downward && Keyboard.down(Keys.up)) {
            if (this.towardsPlayer && GameWorld.player.top - this.region.bottom < 3) {
                this.transportPlayer();
            }
        }
    }
}