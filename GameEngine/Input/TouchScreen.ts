class TouchScreen {
    static _touches = [];
    static _touchPresses = [];

    static init() {
        document.addEventListener('touchstart', TouchScreen.handleTouchStart, false);
        document.addEventListener('touchend', TouchScreen.handleTouchEnd, false);
        document.addEventListener('touchcancel', TouchScreen.handleTouchEnd, false);
        document.addEventListener('touchleave', TouchScreen.handleTouchEnd, false);
        document.body.addEventListener('touchmove', TouchScreen.handleTouchMove, false);
    }

    static handleTouchStart(evt: TouchEvent) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            TouchScreen._touches.push(touches[i]);
            TouchScreen._touchPresses.push(true);
        }
    }

    static handleTouchMove(evt: TouchEvent) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; i++) {
            var id = TouchScreen.getTouchIndexFromId(touches[i].identifier);
            TouchScreen._touches.splice(id, 1, touches[i]);
        }
    }

    static handleTouchEnd(evt: TouchEvent) {
        evt.preventDefault();
        var touches = evt.changedTouches;
        for (var i = 0; i < touches.length; ++i) {
            var id = TouchScreen.getTouchIndexFromId(touches[i].identifier);
            TouchScreen._touches.splice(id, 1);
            TouchScreen._touchPresses.splice(id, 1);
        }
    }

    static get isTouching() {
        return this._touches.length !== 0;
    }

    static get isTouchDevice() {
        return ('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0);
    }

    static reset() {
        for (var i = 0, l = this._touchPresses.length; i < l; ++i) {
            this._touchPresses[i] = false;
        }
    }

    static getTouchIndexFromId(id: number) {
        for (var i = 0, l = TouchScreen._touches.length; i < l; ++i) {
            if (TouchScreen._touches[i].identifier === id)
                return i;
        }
        return -1;
    }

    static getPosition(index: number) {
        var mx = (this._touches[index].pageX - Game.canvas.offsetLeft) * Game.viewport.width / Game.canvas.clientWidth;
        var my = (this._touches[index].pageY - Game.canvas.offsetTop) * Game.viewport.height / Game.canvas.clientHeight;
        return new Vector2(mx, my);
    };

    static getIndexInRect(rect: Rectangle) {
        for (var i = 0, l = TouchScreen._touches.length; i < l; ++i) {
            var pos = TouchScreen.getPosition(i);
            if (rect.contains(pos))
                return i;
        }
        return -1;
    }

    static containsTouch(rect: Rectangle) {
        for (var i = 0, l = TouchScreen._touches.length; i < l; ++i) {
            if (rect.contains(TouchScreen.getPosition(i)))
                return true;
        }
        return false;
    }

    static containsTouchPress(rect: Rectangle) {
        for (var i = 0, l = TouchScreen._touches.length; i < l; ++i) {
            if (rect.contains(TouchScreen.getPosition(i)) && TouchScreen._touchPresses[i])
                return true;
        }
        return false;
    }
}