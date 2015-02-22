class Physics {
    static move(speed: number, direction: Vector2): Vector2 {
        return Vector2.times(speed / direction.length, direction);
    }

    static gravity(gravity: number, deltaTime: number): Vector2 {
        return new Vector2(0, gravity * deltaTime);
    }

    static resistance(resistance: number, velocity: Vector2, deltaTime: number): Vector2 {
        return new Vector2(
            - resistance * velocity.x * velocity.x * deltaTime,
            - resistance * velocity.y * velocity.y * deltaTime);
    }
} 