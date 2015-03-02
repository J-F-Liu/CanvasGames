class Scene extends GameObjectGroup {
    id: number;
    onStart: () => void = null;
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