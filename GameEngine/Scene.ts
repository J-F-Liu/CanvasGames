class Scene extends GameObjectGroup {
    id: number;
    onEnter: () => void = null;
    onLeave: () => void = null;
}

class SceneManager {
    private scenes: Scene[] = [];
    private history: number[] = [];
    currentScene: Scene;

    add(...scenes: Scene[]) {
        for (var i = 0; i < scenes.length; i++) {
            this.scenes.push(scenes[i]);
            scenes[i].id = this.scenes.length - 1;
        }
    }

    get(id: number): Scene {
        return this.scenes[id];
    }

    get count(): number {
        return this.scenes.length;
    }

    switchTo(id: number) {
        if (this.currentScene != null) {
            if (this.currentScene.onLeave != null) {
                this.currentScene.onLeave();
            }
            this.history.push(this.currentScene.id);
        }
        this.currentScene = this.scenes[id];
        if (this.currentScene.onEnter != null) {
            this.currentScene.onEnter();
        }
    }

    goback() {
        if (this.history.length > 0) {
            var id = this.history.pop();
            this.currentScene = this.scenes[id];
            if (this.currentScene.onEnter != null) {
                this.currentScene.onEnter();
            }
        }
    }
} 