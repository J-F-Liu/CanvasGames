class Slider extends GameObject {
    track: StaticImage;
    slug: StaticImage;
    dragging: boolean = false;
    change: (newValue: number) => void;

    constructor(track: SpriteImage, slug: SpriteImage,
        public leftmargin: number, public rightmargin: number, public topmargin: number) {
        super();
        this.track = new StaticImage(track);
        this.slug = new StaticImage(slug);
    }

    get position() {
        return this.track.position;
    }

    set position(value: Vector2) {
        if (this.track != undefined) {
            this.track.position = value;
            this.slug.position.y = this.track.position.y + this.topmargin;
        }
    }

    get value() {
        var trackWidth = this.track.width - this.leftmargin - this.rightmargin - this.slug.width;
        var slugPos = this.slug.position.x - this.track.position.x - this.leftmargin;
        return slugPos / trackWidth;
    }

    set value(value: number) {
        var trackWidth = this.track.width - this.leftmargin - this.rightmargin - this.slug.width;
        var slugPos = trackWidth * value;
        this.slug.position.x = this.track.position.x + this.leftmargin + slugPos;
        this.slug.position.y = this.track.position.y + this.topmargin;
    }

    update(frameSpan: number) {
        if (Mouse.left.down) {
            var mousePos = Mouse.position;
            if (this.track.bound.contains(mousePos) || this.dragging) {
                this.slug.position.x = Maths.clamp(mousePos.x - this.slug.width / 2,
                    this.track.position.x + this.leftmargin,
                    this.track.position.x + this.track.width - this.slug.width - this.rightmargin);
                this.dragging = true;
                if (this.change != null) {
                    this.change(this.value);
                }
            }
        }
        else {
            this.dragging = false;
        }
    }

    draw(renderer: Renderer) {
        this.track.draw(renderer);
        this.slug.draw(renderer);
    }
}