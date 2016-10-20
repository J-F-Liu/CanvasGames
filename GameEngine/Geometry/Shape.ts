import {Vector2} from './Vector2';

export interface Shape {
    contains(point: Vector2): boolean;
    hasIntersect(shape: Shape): boolean;
    center: Vector2;
}