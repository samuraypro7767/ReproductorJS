import { playList } from "./list.js";

const audio = document.getElementById('audio');
const play = document.getElementById('play');
const rewind = document.getElementById('rewind');
const forward = document.getElementById('forward');
const stop = document.getElementById('stop');
const next = document.getElementById('next');
const former = document.getElementById('former');
const trackTitle = document.getElementById('player_song');
const trackArtist = document.getElementById('player_artist');
const trackImage = document.getElementById('player_img');
const progress = document.getElementById('progress');
const time = document.getElementById('time');

let currentTrackIndex = 0;
audio.src = playList[currentTrackIndex].song; // Establecer la primera canción
updateTrackInfo();
 // Actualizar la info de la canción al inicio
audio.addEventListener('timeupdate', () => {
    const value = (audio.currentTime / audio.duration) * 100;
    progress.value = value;

    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60);
    time.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});
function updateTrackInfo() {
    trackTitle.textContent = playList[currentTrackIndex].title;
    trackArtist.textContent = playList[currentTrackIndex].artist;
    trackImage.src = playList[currentTrackIndex].img;
}

// Reproducir/pausar
play.addEventListener('click', () => {
    if (audio.paused) {  
        audio.play();
        play.classList.remove('bx-play');
        play.classList.add('bx-pause');
    } else {
        audio.pause();
        play.classList.remove('bx-pause');
        play.classList.add('bx-play');
    }
});


rewind.addEventListener('click', () => {
    audio.currentTime = Math.max(0, audio.currentTime - 10);
});


forward.addEventListener('click', () => {
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
});


stop.addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
});


next.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playList.length; // Cambiar a la siguiente canción
    audio.src = playList[currentTrackIndex].song; // Actualizar la fuente
    updateTrackInfo(); // Actualizar información de la canción
    audio.play(); // Reproducir la nueva canción
    play.classList.remove('bx-play');
    play.classList.add('bx-pause');
});

// Canción anterior
former.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playList.length) % playList.length; // Cambiar a la canción anterior
    audio.src = playList[currentTrackIndex].song; // Actualizar la fuente
    updateTrackInfo(); 
    audio.play();
    play.classList.remove('bx-play');
    play.classList.add('bx-pause');
});