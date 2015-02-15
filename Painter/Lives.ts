class Lives extends GameObject {
    constructor(
        public live: StaticImage) {
        super();
    }

    draw(renderer: Renderer) {
        for (var i = 0; i < GameWorld.lives; i++) {
            this.live.position.set(i * this.live.width + 15, 60);
            this.live.draw(renderer);
        }
    }
} 