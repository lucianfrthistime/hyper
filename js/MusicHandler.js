function ToggleMusic() {
    const Music = document.getElementById('MusicPlayer');
    const MusicImage = document.getElementById('MusicImage');
    if (!Music || !MusicImage) return;

    Music.volume = 0.18;

    if (Music.paused || Music.ended) {
        Music.play();
        MusicImage.src = "images/Play.png";
    } else {
        Music.pause();
        MusicImage.src = "images/Pause.png";
    }
}