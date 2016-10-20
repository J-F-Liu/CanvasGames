import {Rectangle} from '../../Geometry/Rectangle';
import {Vector2} from '../../Geometry/Vector2';
import {Game} from '../../Game';

export const image = "image";

export class Image {
  image: HTMLImageElement;;

  constructor(
    name: string,
    public region: Rectangle = null,
    public origin: Vector2 = Vector2.zero,
    public visible: boolean = true,
    public rotation: number = 0,
    public scale: number = 1,
    public mirror: boolean = false,
    public fixed: boolean = false,
    public array: {rows: number|Function, cols: number|Function} = null
  ) {
      this.image = Game.images[name];
      this.region = region == null ? new Rectangle(0, 0, this.image.width, this.image.height) : region;
  }
}
