import {Entity} from './Entity';

export interface Processor {
  process(entities: Entity[], timeSpan: number);
}
