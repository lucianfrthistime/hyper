function ToggleMusic() {
    const Music = document.getElementById('MusicPlayer');
    const BgVideo = document.getElementById('BgVideo');
    const MusicImage = document.getElementById('MusicImage');
    const VolumeSlider = document.getElementById('VolumeSlider');
    if (!Music || !MusicImage) return;

    if (VolumeSlider) {
        Music.volume = VolumeSlider.value;
        if (BgVideo) BgVideo.volume = VolumeSlider.value;
    } else {
        Music.volume = 0.18;
        if (BgVideo) BgVideo.volume = 0.18;
    }

    if (Music.paused || Music.ended) {
        Music.play();
        if (BgVideo) {
            BgVideo.muted = false;
            BgVideo.play();
        }
        MusicImage.src = "/images/Play.png";
    } else {
        Music.pause();
        if (BgVideo) BgVideo.pause();
        MusicImage.src = "/images/Pause.png";
    }
}

function ChangeVolume(val) {
    const Music = document.getElementById('MusicPlayer');
    const BgVideo = document.getElementById('BgVideo');
    if (Music) Music.volume = val;
    if (BgVideo) BgVideo.volume = val;
}