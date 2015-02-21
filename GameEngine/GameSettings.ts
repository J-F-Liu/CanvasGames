class GameSettings {

    get storageKey(): string {
        throw "Need be implemented in subclass."
    }

    update(settings: any) {
    }

    static load<T extends GameSettings>(c: { new (): T; }) {
        var settings = new c();
        var data = window.localStorage.getItem(settings.storageKey);
        if (data != null) {
            settings.update(JSON.parse(data));
        }
        return settings;
    }

    save() {
        var settings = JSON.stringify(this);
        window.localStorage.setItem(this.storageKey, settings);
    }

    clearStorage() {
        window.localStorage.removeItem(this.storageKey);
    }
}