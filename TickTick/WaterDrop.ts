class WaterDrop extends Sprite {
    y0: number = 0;
    constructor(public tile: Tile) {
        super(GameWorld.sprites.water);
        this.origin = this.region.center;
        this.position = tile.region.center;
        this.y0 = this.position.y - 10;
    }

    update(frameSpan: number) {
        if (this.visible) {
            var t = Game.totalTime * 3 + this.position.x;
            this.position.y = this.y0 + Math.sin(t) * 5;

            if (this.collideWith(GameWorld.player) && GameWorld.player.alive) {
                this.visible = false;
                Sound.Play(Game.audios['water_collected'], GameWorld.options.volume);
            }
        }
    }
} 