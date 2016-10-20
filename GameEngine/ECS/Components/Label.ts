import {Vector2} from '../../Geometry/Vector2';

export const label = "label";

export class Label {
  visible: boolean = true;
  origin: Vector2 = Vector2.zero;
  position: Vector2;

  constructor(
    x: number,
    y: number,
    public color: string,
    public text: () => string,
    public font: {name: string, size: string} = {name: "Courier New", size: "20px"}
  ) {
    this.position = new Vector2(x, y);
  }
}
