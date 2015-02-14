class Physics {
    static gravity(gravity: number, deltaTime: number): Vector2 {
        return new Vector2(0, gravity * deltaTime);
    }

    static resistance(resistance: number, velocity: Vector2, deltaTime: number): Vector2 {
        return new Vector2(
            - resistance * velocity.x * velocity.x * deltaTime,
            - resistance * velocity.y * velocity.y * deltaTime);
    }
} 