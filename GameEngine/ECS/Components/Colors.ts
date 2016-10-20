import {Game} from '../../Game';
import {Image} from './Image';
import * as _ from 'lodash';

export const colors = "colors";

export class Colors extends Image {
    colors: { [name: string]: HTMLImageElement } = {};
    private _color: string;

    constructor(colors: Object, defaultColor: string) {
      super(colors[defaultColor]);
      this._color = defaultColor;
      for(let [name, imageName] of _.toPairs(colors)) {
          this.colors[name] = Game.images[imageName];
      }
    }

    get color() {
        return this._color;
    }

    set color(value: string) {
        this._color = value;
        this.image = this.colors[this._color];
    }
}
