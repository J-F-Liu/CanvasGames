class Sound {
    static Play(audio: HTMLAudioElement, volume: number = 1.0, loop: boolean = false) {
        if (audio != null) {
            audio.volume = volume;
            audio.loop = loop;
            audio.autoplay = true;
            audio.load();
        }
    }
} 