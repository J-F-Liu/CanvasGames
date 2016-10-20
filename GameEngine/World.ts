import {label, Label} from './ECS/Components/Label';
import {Scene} from './ECS/Scene';
import {position, velocity} from './ECS/Components';
import {Colors, colors} from './ECS/Components/Colors';
import {Image, image} from './ECS/Components/Image';
import {Entity} from './ECS/Entity';
import {Processor} from './ECS/Processor';
import {SceneManager} from './ECS/Scene';
import {Vector2} from './Geometry/Vector2';
import * as _ from 'lodash';

export class World {
  entities: Map<string, Entity> = new Map();
  components: Map<string, Function> = new Map();
  scenes: SceneManager = new SceneManager();
  processors: Processor[] = [];

  constructor() {
    this.registerComponent(position, (entity, {x, y}) => new Vector2(x, y));
    this.registerComponent(velocity, (entity, {x, y}) => new Vector2(x, y));
    this.registerComponent(label, (entity, {x, y, color, text}) => new Label(x, y, color, text));
  }

  registerComponent(name: string, factory: Function) {
    this.components.set(name, factory);
  }

  addProcessor(processor: Processor) {
    this.processors.push(processor);
  }

  update(frameSpan: number) {
    for (let processor of this.processors) {
      processor.process(this.scenes.currentScene.entities, frameSpan);
    }
  }

  static collectAssests(gameData) {
    let images = [];
    for (let name of Object.keys(gameData.entities)) {
      let entity = gameData.entities[name];
      if (entity.hasOwnProperty(image)) {
        images.push(entity[image].name);
      }
      if (entity.hasOwnProperty(colors)) {
        Array.prototype.push.apply(images, _.values(entity[colors]));
      }
    }
    return images;
  }

  load(gameData) {
    for (let [name, data] of _.toPairs(gameData.entities)) {
      let entity = new Entity();
      if (data.hasOwnProperty(image)) {
        let {name, region, origin, visible, rotation, scale, mirror, fixed, array} = data[image];
        entity.addComponent(image, new Image(name, region, origin, visible, rotation, scale, mirror, fixed, array));
      }
      if (data.hasOwnProperty(colors)) {
        entity.addComponent(colors, new Colors(data[colors], data['color']));
      }
      for (let [componentName, factory] of this.components) {
        if (data.hasOwnProperty(componentName)) {
          entity.addComponent(componentName, factory(entity, data[componentName]));
        }
      }
      this.entities.set(name, entity);
    }
    for (let [name, entityList] of _.toPairs(gameData.scenes)) {
      let scene = new Scene(name);
      for (let entityName of entityList) {
        scene.add(this.entities.get(entityName));
      }
      this.scenes.add(scene);
    }
  }
}