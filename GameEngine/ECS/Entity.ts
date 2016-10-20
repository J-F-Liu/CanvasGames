export class Entity {
  id: symbol = Symbol();

  addComponent<T>(name: string, component: T) {
    this[name] = component;
  }

  removeComponent(name: string) {
    delete this[name];
  }

  hasComponent(name: string) : boolean {
    return this.hasOwnProperty(name);
  }
}
