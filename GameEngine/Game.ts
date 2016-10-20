import {Canvas2D, Renderer} from './Canvas2D';
import {Rectangle} from './Geometry/Rectangle';
import {Vector2} from './Geometry/Vector2';
import {Keyboard} from './Input/Keyboard';
import {Mouse} from './Input/Mouse';
import {Color} from './System/Color';
import {World} from './World';

export class Game {
    static world: World;
    static viewport: Rectangle;
    static canvas: HTMLCanvasElement;
    static renderer: Renderer;
    static images: { [name: string]: HTMLImageElement } = {};
    static audios: { [name: string]: HTMLAudioElement } = {};
    static assetsCount: number = 0;
    static assetsLoadingCount: number = 0;
    static totalTime: number = 0;
    static prevTimestamp: number;
    static createWorld: () => World;

    static init(width: number, height: number) {
        Mouse.init();
        Keyboard.init();
        Game.viewport = new Rectangle(0, 0, width, height);
        Game.canvas = Game.createCanvas(width, height);
        Game.renderer = new Canvas2D(Game.canvas);
    }

    static createCanvas(width: number, height: number): HTMLCanvasElement {
        var canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        document.body.appendChild(canvas);
        return canvas;
    }

    static loadImages(imageFolder: string, gameData) {
        let images = World.collectAssests(gameData);
        images.forEach(function (filename) {
            Game.images[filename] = Game.loadImage(imageFolder + filename);
        });
    }

    static loadImage(imagePath: string): HTMLImageElement {
        var image = new Image();
        Game.assetsCount += 1;
        Game.assetsLoadingCount += 1;
        image.onload = function () {
            Game.assetsLoadingCount -= 1;
        }
        image.src = imagePath;
        return image;
    }

    static loadAudio(audioFolder: string, audioName: string): HTMLAudioElement {
        var audio = new Audio();
        if (audio.canPlayType("audio/ogg")) {
            audio.src = audioFolder + audioName + ".ogg";
        } else if (audio.canPlayType("audio/mpeg")) {
            audio.src = audioFolder + audioName + ".mp3";
        } else {
            return null;
        }
        return audio;
    }

    static loadAudios(audioFolder: string, ...audionames: string[]) {
        audionames.forEach(function (audioName) {
            Game.audios[audioName] = Game.loadAudio(audioFolder, audioName);
        });
    }

    static assetLoadingLoop() {
        if (Game.assetsLoadingCount > 0) {
            var percent = Math.round((Game.assetsCount - Game.assetsLoadingCount) / Game.assetsCount * 100);
            Game.renderer.clear();
            Game.renderer.drawText(
                percent + "%", Game.viewport.center, Vector2.zero, Color.black, "top", "Courier New", "48px");
            requestAnimationFrame(Game.assetLoadingLoop);
        } else {
            Game.renderer.clear();
            Game.world = Game.createWorld();
            requestAnimationFrame(Game.mainLoop);
        }
    }

    static mainLoop(timestamp: number) {
        if (Game.prevTimestamp == undefined) {
            Game.prevTimestamp = timestamp;
        }
        var frameSpan = (timestamp - Game.prevTimestamp) / 1000;
        Game.prevTimestamp = timestamp;
        // drops frames of long spans when browser tab is inactive
        if (frameSpan <= 0.5) {
            Game.totalTime += frameSpan;
            Game.world.update(frameSpan);

            Mouse.reset();
            Keyboard.reset();
        }
        requestAnimationFrame(Game.mainLoop);
    }

    static start(createWorld: () => World) {
        Game.createWorld = createWorld;
        Game.assetLoadingLoop();
    }
}