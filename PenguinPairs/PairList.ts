class PairList extends GameObject {
    filled: number = 0;
    indicators: SpriteSheet[] = [];
    indicatorWidth: number;
    constructor(public goal: number) {
        super();
        for (var i = 0; i < goal; i++) {
            this.indicators.push(new SpriteSheet(Game.images['penguin_pairs@8'], 1, 8, 7));
        }
        this.indicatorWidth = this.indicators[0].width;
    }

    get finished() {
        return this.filled >= this.goal;
    }

    get dockPosition() {
        return Vector2.plus(this.position, new Vector2(110 + this.filled * this.indicatorWidth, 8));
    }

    addPair(color: string) {
        this.indicators[this.filled].sheetIndex = Penguin.colors.indexOf(color);
        this.filled += 1;
    }

    draw(renderer: Renderer) {
        GameWorld.sprites.frame_goal.position = this.position;
        GameWorld.sprites.frame_goal.draw(renderer);
        for (var i = 0; i < this.goal; i++) {
            var position = Vector2.plus(this.position, new Vector2(110 + i * this.indicatorWidth, 8));
            this.indicators[i].draw(position, 0, 1, Vector2.zero, false, renderer);
        }
    }
}