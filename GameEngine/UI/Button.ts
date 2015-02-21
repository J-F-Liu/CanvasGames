class Button extends StaticImage {
    pressed: boolean = false;
    click: () => void = null;
    constructor(image: SpriteImage) {
        super(image);
    }

    update(frameSpan: number) {
        this.pressed = false;
        if (this.visible && Mouse.hover(this.bound)) {
            document.body.style.cursor = "pointer";
            if (Mouse.left.pressed) {
                this.pressed = true;
                if (this.click != null) {
                    this.click();
                }
            }
        }
    }
}

class ToggleButton extends Button {
    change: (newValue: boolean) => void;
    constructor(public image: SpriteSheet, public offIndex: number, public onIndex: number) {
        super(image);
        this.click = function () {
            this.on = !this.on;
            if (this.onchange != null) {
                this.onchange(this.on);
            }
        }
    }

    get on() {
        return this.image.sheetIndex == this.onIndex;
    }

    set on(value: boolean) {
        if (value) {
            this.image.sheetIndex = this.onIndex;
        } else {
            this.image.sheetIndex = this.offIndex;
        }
    }
}

class StatefulButton extends Button {
    state: string;

    constructor(
        public states: { [name: string]: SpriteImage },
        defaultState: string) {
        super(states[defaultState]);
        this.state = defaultState;
        this.image = this.states[this.state];
    }

    draw(renderer: Renderer) {
        if (this.state != undefined) {
            this.image = this.states[this.state];
            super.draw(renderer);
        }
    }
}