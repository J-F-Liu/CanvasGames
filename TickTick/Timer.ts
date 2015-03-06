class Timer extends Label {
    timeLeft: number;
    running: boolean;
    constructor() {
        super("", Color.yellow, "Arial", "26pt");
        this.position.set(25, 33);
        this.reset();
    }

    reset() {
        this.timeLeft = GameWorld.options.timerTicks;
        this.running = true;
    }

    get multiplier() {
        if (GameWorld.options.enableIceAndHot) {
            if (GameWorld.player.walkingOnHot) {
                return 2;
            } else if (GameWorld.player.walkingOnIce) {
                return 0.5;
            }
        }
        return 1;
    }

    update(frameSpan: number) {
        if (this.running) {
            this.timeLeft -= frameSpan * this.multiplier;
            if (this.timeLeft < 0) {
                this.running = false;
                this.timeLeft = 0;
                GameWorld.player.explode();
            }
            var minutes = Math.floor(this.timeLeft / 60);
            var seconds = Math.ceil(this.timeLeft % 60);
            this.text = minutes + (seconds > 9 ? ":" : ":0") + seconds;
            if (this.timeLeft <= 10 && seconds % 2 === 0) {
                this.color = Color.red;
            } else {
                this.color = Color.yellow;
            }
        }
    }

    draw(renderer: Renderer) {
        GameWorld.sprites.timer.draw(renderer);
        super.draw(renderer);
    }
} 