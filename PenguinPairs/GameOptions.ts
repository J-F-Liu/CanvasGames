class GameOptions extends GameSettings {
    showTip: boolean = true;
    volume: number = 1;

    get storageKey() {
        return "PenguinPairsOptions";
    }

    update(options: any) {
        this.showTip = options.showTip;
        this.volume = options.volume;
    }
}