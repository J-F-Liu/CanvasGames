import {Entity} from './Entity';

export class Scene {
  name: string;
  entities: Entity[];
  onEnter: () => void = null;
  onLeave: () => void = null;

  constructor(name: string, ...entities: Entity[]) {
    this.name = name;
    this.entities = entities;
  }

  add(entity: Entity) {
    this.entities.push(entity);
  }

  reset() {
    for (let entity of this.entities) {
      if (entity.hasComponent('reset')) {
          entity['reset']();
      }
    }
  }
}

export class SceneManager {
    private scenes: Map<string, Scene> = new Map();
    private history: string[] = [];
    currentScene: Scene = null;

    add(scene: Scene) {
        this.scenes.set(scene.name, scene);
    }

    get(name: string): Scene {
        return this.scenes.get(name);
    }

    get count(): number {
        return this.scenes.size;
    }

    switchTo(name: string) {
        if (this.currentScene != null) {
            if (this.currentScene.onLeave != null) {
                this.currentScene.onLeave();
            }
            this.history.push(this.currentScene.name);
        }
        this.currentScene = this.scenes.get(name);
        if (this.currentScene.onEnter != null) {
            this.currentScene.onEnter();
        }
    }

    goback() {
        if (this.history.length > 0) {
            var name = this.history.pop();
            this.currentScene = this.scenes.get(name);
            if (this.currentScene.onEnter != null) {
                this.currentScene.onEnter();
            }
        }
    }
}
