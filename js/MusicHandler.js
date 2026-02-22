function ToggleMusic() {
    const Music = document.getElementById('MusicPlayer');
    const MusicImage = document.getElementById('MusicImage');
    const VolumeSlider = document.getElementById('VolumeSlider');
    if (!Music || !MusicImage) return;

    if (VolumeSlider) {
        Music.volume = VolumeSlider.value;
    } else {
        Music.volume = 0.18;
    }

    if (Music.paused || Music.ended) {
        Music.play();
        MusicImage.src = "images/Play.png";
    } else {
        Music.pause();
        MusicImage.src = "images/Pause.png";
    }
}

function ChangeVolume(val) {
    const Music = document.getElementById('MusicPlayer');
    if (!Music) return;
    Music.volume = val;
}