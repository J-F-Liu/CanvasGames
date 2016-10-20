import {ButtonState} from './ButtonState';

export class Keyboard {
    static keyStates: ButtonState[];
    static init() {
        Keyboard.keyStates = [];
        for (var i = 0; i < 256; ++i) {
            Keyboard.keyStates.push(new ButtonState());
        }
        document.onkeydown = Keyboard.handleKeyDown;
        document.onkeyup = Keyboard.handleKeyUp;
    }

    static handleKeyDown(evt: KeyboardEvent) {
        Keyboard.keyStates[evt.keyCode].press();
    }

    static handleKeyUp(evt: KeyboardEvent) {
        Keyboard.keyStates[evt.keyCode].release();
    }

    static down(key: number): boolean {
        return Keyboard.keyStates[key].down;
    }

    static pressed(key: number): boolean {
        return Keyboard.keyStates[key].pressed;
    }

    static reset() {
        for (var i = 0; i < 256; ++i) {
            Keyboard.keyStates[i].reset();
        }
    }
} 