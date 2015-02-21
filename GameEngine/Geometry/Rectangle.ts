interface Shape {
    contains(point: Vector2): boolean;
    hasIntersect(shape: Shape): boolean;
    center: Vector2;
}

class Rectangle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) {
    }

    get left(): number {
        return this.x;
    }

    get right(): number {
        return this.x + this.width;
    }

    get top(): number {
        return this.y;
    }

    get bottom(): number {
        return this.y + this.height;
    }

    get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    get size(): Vector2 {
        return new Vector2(this.width, this.height);
    }

    get center(): Vector2 {
        return new Vector2(this.left + this.width / 2, this.top + this.height / 2);
    }

    contains(point: Vector2): boolean {
        return point.x >= this.left && point.x <= this.right &&
            point.y >= this.top && point.y <= this.bottom;
    }

    hasIntersect(shape: Shape): boolean {
        if (shape instanceof Rectangle) {
            var rectangle = <Rectangle> shape;
            var left = Math.max(this.left, rectangle.left);
            var right = Math.min(this.right, rectangle.right);
            var top = Math.max(this.top, rectangle.top);
            var bottom = Math.min(this.bottom, rectangle.bottom);
            return left < right && top < bottom;
        }
        else if (shape instanceof Circle) {
            var circle = <Circle> shape;
            return circle.contains(this.position) ||
                circle.contains(new Vector2(this.right, this.top)) ||
                circle.contains(new Vector2(this.right, this.bottom)) ||
                circle.contains(new Vector2(this.left, this.bottom)) ||
                new Rectangle(this.left, this.top - circle.radius, this.width, this.height + 2 * circle.radius).contains(circle.position) ||
                new Rectangle(this.left - circle.radius, this.top, this.width + 2 * circle.radius, this.height).contains(circle.position);
        }
        return false;
    }
} 