import { addZero } from './supScript.js';

export const musicPlayerInit = () => {
    
    const audio = document.querySelector('.audio'),
          audioImg = document.querySelector('.audio-img'),
          audioHeader = document.querySelector('.audio-header'),
          audioPlayer = document.querySelector('.audio-player'),
          audioNavigation = document.querySelector('.audio-navigation'),
          audioButtonPlay = document.querySelector('.audio-button__play'),
          audioProgressTiming = document.querySelector('.audio-progress__timing'),
          audioProgress = document.querySelector('.audio-progress'),
          audioTimePassed = document.querySelector('.audio-time__passed'),
          audioTimeTotal = document.querySelector('.audio-time__total');

    const playlist = ['hello', 'flow', 'speed'];

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];
        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;
        isPlayed ? audioPlayer.pause() : audioPlayer.play();
    };

    const prevTrack = () => {
        trackIndex ? trackIndex-- : trackIndex = playlist.length - 1;
        loadTrack();
    };
    
    const nextTrack = () => {
        trackIndex === playlist.length - 1 ? trackIndex = 0 : trackIndex++;
        loadTrack();
    };

    let trackIndex = 0;

    audioNavigation.addEventListener('click', event => {
        const target = event.target;
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play'),
            audioButtonPlay.classList.toggle('fa-play'),
            audioButtonPlay.classList.toggle('fa-pause')
            audioPlayer.paused ? audioPlayer.play() : audioPlayer.pause();
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        };
        if (target.classList.contains('audio-button__prev')) prevTrack();
        if (target.classList.contains('audio-button__next')) nextTrack();
    });

    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration,
              currentTime = audioPlayer.currentTime,
              progress = (currentTime / duration) * 100;
        audioProgressTiming.style.width = progress + '%';
        const minutesPassed = Math.floor(currentTime / 60) || '0',
              secondsPassed = Math.floor(currentTime % 60) || '0',
              minutesTotal = Math.floor(duration / 60) || '0',
              secondsTotal = Math.floor(duration % 60) || '0';
        audioTimePassed.textContent = `${addZero(minutesPassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`;
    });
    
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX,
              allWidth = audioProgress.clientWidth,
              progress = (x / allWidth) * audioPlayer.duration;
        audioPlayer.currentTime = progress;
    });

    musicPlayerInit.stop = () => {
        if (!audioPlayer.paused) {
            audioPlayer.pause();
            audio.classList.remove('play');
            audioButtonPlay.classList.remove('fa-pause');
            audioButtonPlay.classList.add('fa-play');        
        };
    };
};