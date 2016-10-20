import {Renderer} from '../../Canvas2D';
import {Game} from '../../Game';
import {Vector2} from '../../Geometry/Vector2';
import {position} from '../Components';
import {colors} from '../Components/Colors';
import {Image, image} from '../Components/Image';
import {Label, label} from '../Components/Label';
import {Entity} from '../Entity';
import {Processor} from '../Processor';
import * as _ from 'lodash';

export class RendererSystem implements Processor {
  constructor(public renderer: Renderer) {
  }

  process(entities: Entity[], timeSpan: number) {
    for (let entity of entities) {
      if (entity.hasComponent(image)) {
        this.drawImage(entity[position], entity[image]);
      }
      if (entity.hasComponent(colors)) {
        this.drawImage(entity[position], entity[colors]);
      }
      if (entity.hasComponent(label)) {
        this.drawLabel(entity[position], entity[label]);
      }
    }
  }

  drawImage(position: Vector2, image: Image) {
    if (image.visible) {
      let pos = image.fixed ? position : Vector2.minus(position, Game.viewport.position);
      if (image.array) {
        let {rows, cols} = _.mapValues(image.array, val => typeof(val) == "number" ? val : val());
        for (let row=0; row<rows; row++) {
          for (let col=0; col<cols; col++) {
            this.renderer.drawImage(
              image.image, pos, image.rotation, image.scale, image.origin, image.region, image.mirror);
            pos.x += image.region.width;
          }
          pos.y += image.region.height;
        }
      } else {
        this.renderer.drawImage(
          image.image, pos, image.rotation, image.scale, image.origin, image.region, image.mirror);
      }
    }
  }

  drawLabel(position: Vector2, label: Label) {
    if (label.visible) {
        this.renderer.drawText(
          label.text(),
          Vector2.plus(position, label.position),
          label.origin, label.color, "left", label.font.name, label.font.size);
    }
  }
}
