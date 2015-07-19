class Dot {
    constructor(
        public x: number,
        public y: number,
        public color: string,
        public duration: number) {
    }
}

class Glitter extends GameObject {
    dots: Dot[] = [];
    frame: number = 0;
    duration: number = 0;

    constructor() {
        super();
        this.reset();
    }

    reset() {
        this.visible = false;
        this.frame = 0;
    }

    addDot(x: number, y: number, color: string, duration: number) {
        this.dots.push(new Dot(x, y, color, duration));
        this.duration = Math.max(this.duration, duration);
    }

    addStar(x: number, y: number, color: string, duration: number) {
        this.addDot(x, y, color, duration + 4);
        this.addDot(x + 1, y, color, duration);
        this.addDot(x, y + 1, color, duration);
        this.addDot(x - 1, y, color, duration);
        this.addDot(x, y - 1, color, duration);
    }

    draw(renderer: Renderer) {
        if (this.visible) {
            this.frame++;
            for (var i = 0, dot:Dot; dot = this.dots[i]; i++) {
                if (dot.duration >= this.frame) {
                    var position = Vector2.minus(this.position, Game.viewport.position);
                    renderer.drawRectangle(dot.color, position.x + dot.x, position.y + dot.y, 2, 2);
                }
            }
            if (this.frame > this.duration) {
                GameWorld.currentLevel.remove(this);
            }
        }
    }
}