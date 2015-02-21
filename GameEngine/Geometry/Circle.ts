class Circle implements Shape {
    constructor(
        public x: number,
        public y: number,
        public radius: number) {
    }

    get position(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    get center(): Vector2 {
        return this.position;
    }

    contains(point: Vector2): boolean {
        return Vector2.distance(this.position, point) <= this.radius;
    }

    hasIntersect(shape: Shape): boolean {
        if (shape instanceof Rectangle) {
            var rectangle = <Rectangle> shape;
            return rectangle.hasIntersect(this);
        }
        else if (shape instanceof Circle) {
            var circle = <Circle> shape;
            return Vector2.distance(this.position, circle.position) < this.radius + circle.radius;
        }
        return false;
    }
} 