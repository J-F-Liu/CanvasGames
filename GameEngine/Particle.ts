class Particle extends Sprite {
    age: number = 0;
    onEmit: () => void;
    onFly: () => void;
    onDie: () => void;
    constructor(image: SpriteImage,
        public life: number,
        onEmit?: () => void) {
        super(image);
        this.visible = false;
        this.onEmit = onEmit;
    }

    get progress() {
        return this.age / this.life;
    }

    update(frameSpan: number) {
        if (this.visible) {
            this.age += frameSpan;
            if (this.age > this.life) {
                this.visible = false;
                if (this.onDie != null) {
                    this.onDie();
                }
            } else {
                super.update(frameSpan);
                if (this.onFly != null) {
                    this.onFly();
                }
            }
        }
    }

    emit() {
        this.visible = true;
        this.age = 0;
        if (this.onEmit != null) {
            this.onEmit();
        }
    }
} 