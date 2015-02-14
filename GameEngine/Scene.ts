class Scene {
    id: number;
    objects: GameObject[];

    constructor(...objects: GameObject[]) {
        this.objects = objects;
    }

    update(frameSpan: number) {
        this.objects.forEach((obj) => {
            obj.update(frameSpan);
        });
    }

    render(renderer: Renderer) {
        this.objects.forEach((obj) => {
            if (obj.visible) {
                obj.draw(renderer);
            }
        });
    }

    onStart: () => void;

    reset() {
        this.objects.forEach((obj) => {
            obj.reset();
        });
    }
}

class SceneManager {
    private scenes: Scene[] = [];
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
        this.currentScene = this.scenes[id];
        if (this.currentScene.onStart) {
            this.currentScene.onStart();
        }
    }
} 