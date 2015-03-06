class GameOptions extends GameSettings {
    enableEnemies: boolean = true;
    enableIceAndHot: boolean = true;
    timerTicks: number = 30;
    volume: number = 1;

    get storageKey() {
        return "TickTickOptions";
    }

    update(options: any) {
        this.enableEnemies = options.enableEnemies;
        this.enableIceAndHot = options.enableIceAndHot;
        this.timerTicks = options.timerTicks;
        this.volume = options.volume;
    }
}