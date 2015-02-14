class Label extends GameObject {
    constructor(public text: string, public color: string, public fontname: string = "Courier New", public fontsize: string = "20px") {
        super();
    }

    draw(renderer: Renderer) {
        renderer.drawText(
            this.text,
            this.position,
            this.origin,
            this.color,
            "left",
            this.fontname,
            this.fontsize);
    }
} 