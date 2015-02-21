class LevelButton extends StatefulButton {
    label: Label;
    constructor(public levelIndex: number) {
        super({
            unsolved: GameWorld.sprites.level_unsolved,
            solved: new SpriteSheet(Game.images['level_solved@6'], 1, 6, levelIndex),
            locked: GameWorld.sprites.level_locked
        }, "unsolved");

        var row = Math.floor(levelIndex / 5);
        var col = levelIndex % 5;
        this.position.set(155 + (this.width + 30) * col, 230 + (this.height + 5) * row);
        this.click = function () {
            if (this.state != "locked") {
                GameWorld.gotoLevel(this.levelIndex);
            }
        }

        this.label = new Label((levelIndex + 1).toString(), Color.black, "Arial", "20px");
        this.label.position = Vector2.minus(this.bound.center, Vector2.times(0.5, this.label.size));
        this.label.position.y += 25;
    }

    draw(renderer: Renderer) {
        super.draw(renderer);
        this.label.draw(renderer);
    }
}