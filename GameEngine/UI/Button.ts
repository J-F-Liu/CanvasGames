class Button extends StaticImage {
    pressed: boolean = false;
    constructor(image: HTMLImageElement) {
        super(image);
    }

    update(frameSpan: number) {
        this.pressed = false;
        if (this.visible && Mouse.hover(this.bound)) {
            document.body.style.cursor = "pointer";
            if (Mouse.left.pressed) {
                this.pressed = true;
            }
        }
    }
} 