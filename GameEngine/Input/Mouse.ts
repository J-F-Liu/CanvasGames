class Mouse {
    static position: Vector2 = Vector2.zero;
    static left: ButtonState = new ButtonState();
    static middle: ButtonState = new ButtonState();
    static right: ButtonState = new ButtonState();

    static init() {
        document.onmousemove = Mouse.handleMouseMove;
        document.onmousedown = Mouse.handleMouseDown;
        document.onmouseup = Mouse.handleMouseUp;
    }

    static handleMouseMove(evt: MouseEvent) {
        Mouse.position.x = (evt.pageX - Game.canvas.offsetLeft) * Game.viewport.width / Game.canvas.clientWidth;
        Mouse.position.y = (evt.pageY - Game.canvas.offsetTop) * Game.viewport.height / Game.canvas.clientHeight;
    }

    static handleMouseDown(evt: MouseEvent) {
        Mouse.handleMouseMove(evt);
        switch (evt.button) {
            case 0:
                Mouse.left.press();
                break;
            case 1:
                Mouse.middle.press();
                break;
            case 2:
                Mouse.right.press();
                break;
        }
    }

    static handleMouseUp(evt: MouseEvent) {
        Mouse.handleMouseMove(evt);
        switch (evt.button) {
            case 0:
                Mouse.left.release();
                break;
            case 1:
                Mouse.middle.release();
                break;
            case 2:
                Mouse.right.release();
                break;
        }
    }

    static reset() {
        Mouse.left.reset();
        Mouse.middle.reset();
        Mouse.right.reset();
    }
} 