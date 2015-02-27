class Arrow extends StatefulButton {
    animal: Animal;
    constructor(public direction: number) {
        super({
            normal: new SpriteSheet(Game.images['arrow@4'], 1, 4, GameData.directions[Direction[direction]]),
            hover: new SpriteSheet(Game.images['arrow_hover@4'], 1, 4, GameData.directions[Direction[direction]]),
            hint: new SpriteSheet(Game.images['arrow_hint@4'], 1, 4, GameData.directions[Direction[direction]]),
        }, 'normal');
        this.visible = false;
    }

    update(frameSpan: number) {
        if (this.visible) {
            super.update(frameSpan);
            if (this.state != 'hint') {
                if (Mouse.hover(this.bound)) {
                    this.state = 'hover';
                } else {
                    this.state = 'normal';
                }
            }
            if (this.pressed) {
                this.animal.selected = false;
                this.animal.direction = this.direction;
                this.animal.velocity = Physics.move(300, Directions.vector(this.direction));
                GameWorld.currentLevel.hasMoves = true;
            }
        }
    }

    indicate(animal: Animal) {
        if (animal != null) {
            var tile = animal.tile.neighbour(this.direction);
            this.visible = tile != null && animal.canReach(tile);
            if (this.visible) {
                this.animal = animal;
                this.position = tile.position;
            }
        } else {
            this.visible = false;
        }
    }
} 