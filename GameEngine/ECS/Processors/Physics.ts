import {Entity} from '../Entity';
import {Processor} from '../Processor';
import {position, velocity} from '../Components';

export class PhysicsSystem implements Processor {
  process(entities: Entity[], frameSpan: number) {
    for (let entity of entities) {
      if (entity.hasComponent(velocity)) {
        let {x: vx, y: vy} = entity[velocity];
        entity[position].x += vx * frameSpan;
        entity[position].y += vy * frameSpan;
      }
    }
  }
}
