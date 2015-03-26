class Vector2 {
    constructor(
        public x: number,
        public y: number) {
    }

    get length() { return Math.sqrt(this.x * this.x + this.y * this.y); }

    get isZero() {
        return this.x === 0 && this.y === 0;
    }

    add(v: Vector2) {
        this.x += v.x;
        this.y += v.y;
    }

    normalize() {
        var length = this.length;
        if (length != 0) {
            this.x /= length;
            this.y /= length;
        }
    }

    round() {
        return new Vector2(Math.round(this.x), Math.round(this.y));
    }

    toString() {
        return "(" + this.x + ", " + this.y + ")";
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    copy() { return new Vector2(this.x, this.y); }

    static get zero() { return new Vector2(0, 0); }
    static plus(v1: Vector2, v2: Vector2) { return new Vector2(v1.x + v2.x, v1.y + v2.y); }
    static minus(v1: Vector2, v2: Vector2) { return new Vector2(v1.x - v2.x, v1.y - v2.y); }
    static times(k: number, v: Vector2) { return new Vector2(k * v.x, k * v.y); }
    static dot(v1: Vector2, v2: Vector2) { return v1.x * v2.x + v1.y * v2.y; }
    static distance(v1: Vector2, v2: Vector2) { return Vector2.minus(v1, v2).length; }
} 