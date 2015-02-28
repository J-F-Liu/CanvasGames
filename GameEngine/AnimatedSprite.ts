class AnimatedSprite extends Sprite {
    private _animation: string;

    constructor(
        public animations: { [name: string]: Animation },
        defaultAnimation: string) {
        super(animations[defaultAnimation]);
        this.animation = defaultAnimation;
    }

    get animation() {
        return this._animation;
    }

    set animation(value: string) {
        this._animation = value;
        this.image = this.animations[this._animation];
        this.animations[this._animation].play();
    }

    update(frameSpan: number) {
        super.update(frameSpan);
        if (this.visible) {
            this.image.update(frameSpan);
        }
    }
} 