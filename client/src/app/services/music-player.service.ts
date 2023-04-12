import { Injectable } from '@angular/core';
import { Music } from '../../../../common/music';
import { Playlist } from '../../../../common/playlist';
import { MusicasService } from '../musicas.service';

@Injectable({
  providedIn: 'root'
})
export class MusicPlayerService {

  playlist: Playlist = new Playlist(<Playlist>{});

  musicList: Music[] = [];

  currentIndex: number = 0;

  currentMusic: Music = new Music(<Music>{});

  audio: HTMLAudioElement = new Audio('assets/musics/' + this.currentMusic.id + '/audio.mp3');

  isPlaying: boolean = false;

  musicTime = {
    'minutes': (Math.floor(this.currentMusic.duration / 60) || 0).toString().padStart(2, '0'),
    'seconds': (Math.floor(this.currentMusic.duration % 60) || 0).toString().padStart(2, '0')
  };

  currentTime = { 'minutes': '00', 'seconds': '00' }

  updateInterval: any;

  constructor(private musicService: MusicasService) {
    this.updateInterval = setInterval(() => {
      this.updateMusicInfo();
    }, 1000);

    this.audio.id = 'audio-player';

    this.audio.addEventListener('ended', () => {
      this.next();
    });

    document.body.appendChild(this.audio);
  }

  next() {
    if (this.musicList.length > 0) {
      if (this.currentIndex < this.musicList.length - 1) {
        this.playMusic(this.musicList[this.musicList.indexOf(this.currentMusic) + 1]);
      } else {
        this.playMusic(this.musicList[0]);
      }
    }
  }

  back() {
    if (this.musicList.length > 0) {
      if (this.currentIndex > 0) {
        this.playMusic(this.musicList[this.musicList.indexOf(this.currentMusic) - 1]);
      } else {
        this.playMusic(this.musicList[this.musicList.length - 1]);
      }
    }
  }

  updateMusicInfo() {
    this.currentTime = {
      'minutes': (Math.floor(this.audio.currentTime / 60) || 0).toString().padStart(2, '0'),
      'seconds': (Math.floor(this.audio.currentTime % 60) || 0).toString().padStart(2, '0')
    }
    this.musicTime = {
      'minutes': (Math.floor(this.audio.duration / 60) || 0).toString().padStart(2, '0'),
      'seconds': (Math.floor(this.audio.duration % 60) || 0).toString().padStart(2, '0')
    };
    this.getCurrentProgress();
  }

  playMusic(music: Music) {
    this.currentIndex = this.musicList.indexOf(music);
    this.currentMusic = music;
    this.audio.pause();
    this.audio.src = 'assets/musics/' + this.currentMusic.id + '/audio.mp3';
    this.musicTime = {
      'minutes': (Math.floor(this.audio.duration / 60) || 0).toString().padStart(2, '0'),
      'seconds': (Math.floor(this.audio.duration % 60) || 0).toString().padStart(2, '0')
    };
    this.currentTime = { 'minutes': '00', 'seconds': '00' }
    this.play();
  }

  playPlaylist(playlist: Playlist) {
    this.playlist = playlist;
    this.musicList = [];
    this.musicService.getMusicsById(this.playlist.musics[0])
      .subscribe(
        firstMusic => {
          this.musicList.push(firstMusic);
          if (this.playlist.musics.length === 1) {
            this.playMusic(this.musicList[0]);
          }
          for (let i = 1; i < this.playlist.musics.length; i++) {
            this.musicService.getMusicsById(this.playlist.musics[i]).subscribe(
              nextMusic => {
                this.musicList.push(nextMusic);
                if (i === this.playlist.musics.length - 1) {
                  this.playMusic(this.musicList[0]);
                }
              },
              error => {
                console.error(error);
              }
            );
          }
        },
        error => {
          console.error(error);
        }

      );
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  getCurrentTime(): string {
    return this.currentTime.minutes + ":" + this.currentTime.seconds;
  }

  getCurrentMusicTime(): string {
    return this.musicTime.minutes + ":" + this.musicTime.seconds;
  }

  getCurrentProgress(): number {
    return this.audio.currentTime / this.audio.duration * 100;
  }

  getCurrentMusic(): Music {
    return this.currentMusic;
  }

  getCurrentState(): boolean {
    return this.isPlaying;
  }

  getCurrentMusicName(): string {
    return this.currentMusic.name || "";
  }

  getCurrentPlaylistName(): string {
    return this.playlist.name || "";
  }
}
