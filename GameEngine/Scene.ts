class Scene extends GameObject{
    id: number;
    objects: GameObject[];

    constructor(...objects: GameObject[]) {
        super();
        this.objects = objects;
    }

    add(gameObj: GameObject) {
        this.objects.push(gameObj);
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