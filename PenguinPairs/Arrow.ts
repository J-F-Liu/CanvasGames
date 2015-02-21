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
        super.update(frameSpan);
        if (this.visible && this.state != 'hint') {
            if (Mouse.hover(this.bound)) {
                this.state = 'hover';
            } else {
                this.state = 'normal';
            }
        }
        if (this.visible && Mouse.pressed(this.bound)) {
            this.animal.selected = false;
            this.animal.direction = this.direction;
            switch (this.direction) {
                case Direction.east:
                    this.animal.velocity.set(300, 0);
                    break;
                case Direction.south:
                    this.animal.velocity.set(0, 300);
                    break;
                case Direction.west:
                    this.animal.velocity.set(-300, 0);
                    break;
                case Direction.north:
                    this.animal.velocity.set(0, -300);
                    break;
            }
            GameWorld.currentLevel.hasMoves = true;
        }
    }

    indicate(animal: Animal) {
        if (animal != null) {
            var tile = animal.tile.neighbour(this.direction);
            this.visible = tile != null && Animal.canReach(tile);
            if (this.visible) {
                this.animal = animal;
                this.position = tile.position;
            }
        } else {
            this.visible = false;
        }
    }
} 