export class ButtonState {
    down: boolean = false;
    pressed: boolean = false;

    press() {
        if (!this.down) {
            this.down = true;
            this.pressed = true;
        }
    }

    release() {
        this.down = false;
    }

    reset() {
        this.pressed = false;
    }
} 