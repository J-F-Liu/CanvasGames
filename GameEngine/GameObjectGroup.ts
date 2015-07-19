class GameObjectGroup extends GameObject {
    objects: GameObject[];

    constructor(...objects: GameObject[]) {
        super();
        this.objects = objects;
    }

    add(...gameObjs: GameObject[]) {
        this.addArray(gameObjs);
    }

    addArray(gameObjs: GameObject[]) {
        for (var i = 0; i < gameObjs.length; i++) {
            this.objects.push(gameObjs[i]);
        }
    }

    remove(gameObject: GameObject) {
        for (var i = this.objects.length - 1; i >= 0; i--) {
            if (this.objects[i] == gameObject) {
                this.objects.splice(i, 1);
                return;
            }
        }
    }

    update(frameSpan: number) {
        this.objects.forEach((obj) => {
            obj.update(frameSpan);
        });
    }

    draw(renderer: Renderer) {
        if (this.visible) {
            this.objects.forEach((obj) => {
                obj.draw(renderer);
            });
        }
    }

    reset() {
        this.objects.forEach((obj) => {
            obj.reset();
        });
    }
} 