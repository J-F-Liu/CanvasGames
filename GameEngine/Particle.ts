class Particle extends Sprite {
    age: number = 0;
    constructor(image: HTMLImageElement,
        public life: number,
        public onEmit: () => void) {
        super(image);
        this.visible = false;
    }

    update(frameSpan: number) {
        if (this.visible) {
            this.age += frameSpan;
            if (this.age > this.life) {
                this.visible = false;
            } else {
                super.update(frameSpan);
            }
        }
    }

    emit() {
        this.visible = true;
        this.age = 0;
        this.onEmit();
    }
} 