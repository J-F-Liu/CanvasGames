class Score extends StaticImage {
    label: Label;
    constructor(image: HTMLImageElement) {
        super(image);
        this.position.set(10, 10);
        this.label = new Label("", Color.white);
        this.label.position.set(20, 20);
    }

    draw(renderer: Renderer) {
        super.draw(renderer);
        this.label.draw(renderer);
    }

    update(frameSpan) {
        this.label.text = "Score: " + GameWorld.score.toString();
    }
} 