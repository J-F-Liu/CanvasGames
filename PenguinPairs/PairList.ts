class PairList extends GameObject {
    indicators: SpriteSheet[] = [];
    constructor(public goal: number) {
        super();
        for (var i = 0; i < goal; i++) {
            this.indicators.push(new SpriteSheet(Game.images['penguin_pairs@8'], 1, 8, 7));
        }
    }

    addPair(color: string) {
        for (var i = 0; i < this.goal; i++) {
            if (this.indicators[i].sheetIndex == 7) {
                this.indicators[i].sheetIndex = Penguin.colors.indexOf(color);
                break;
            }
        }
    }

    draw(renderer: Renderer) {
        GameWorld.sprites.frame_goal.position = this.position;
        GameWorld.sprites.frame_goal.draw(renderer);
        for (var i = 0; i < this.goal; i++) {
            var indicator = this.indicators[i];
            var position = Vector2.plus(this.position, new Vector2(110 + i * indicator.width, 8));
            indicator.draw(position, 0, 1, Vector2.zero, false, renderer);
        }
    }
}