class Scene extends GameObject {
    id: number;
    objects: GameObject[];
    onStart: () => void = null;

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

class SceneManager {
    private scenes: Scene[] = [];
    private history: number[] = [];
    currentScene: Scene;

    add(scene: Scene): number {
        this.scenes.push(scene);
        scene.id = this.scenes.length - 1;
        return scene.id;
    }

    get(id: number): Scene {
        return this.scenes[id];
    }

    get count(): number {
        return this.scenes.length;
    }

    switchTo(id: number) {
        if (this.currentScene != null) {
            this.history.push(this.currentScene.id);
        }
        this.currentScene = this.scenes[id];
        if (this.currentScene.onStart != null) {
            this.currentScene.onStart();
        }
    }

    goback() {
        if (this.history.length > 0) {
            var id = this.history.pop();
            this.currentScene = this.scenes[id];
            if (this.currentScene.onStart != null) {
                this.currentScene.onStart();
            }
        }
    }
} 