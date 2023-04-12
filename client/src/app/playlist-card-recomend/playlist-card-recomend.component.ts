import { Clipboard } from '@angular/cdk/clipboard';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Playlist } from '../../../../common/playlist';
import { PlaylistService } from '../playlist.service';
import { UserService } from '../user.service';
import { Category } from '../../../../common/category';
import { MusicPlayerService } from '../services/music-player.service';


@Component({
  selector: 'app-playlist-card-recomend',
  templateUrl: './playlist-card-recomend.component.html',
  styleUrls: ['./playlist-card-recomend.component.scss']
})
export class PlaylistCardRecomendComponent {

  constructor(public musicPlayerService: MusicPlayerService, private clipboard: Clipboard, private router: Router, private playlistService: PlaylistService, private userService: UserService) { };

  @Input() playlist: any;
  showShareMessage = false;
  showLikedMessage = false;
  src = "/assets/play.svg";

  categorias: Category[] = [];
  userId: number = 0;

  ngOnInit() {
    this.userService.getUserId().subscribe(
      as => { this.userId = as; },
      msg => { alert(msg.message); }
    )
    this.playlistService.getPlaylistCategories(this.playlist?.id).subscribe(
      as => { this.categorias = as; },
      msg => { alert(msg.message); }
    )
  }

  openPlaylistOnClick(event: Event, playlist: Playlist) {
    this.router.navigate(['/playlist/', playlist.id])
  }

  playOrPauseOnClick(event: Event) {
    event.stopPropagation();
    if (this.isPausable()) {
      this.src = "/assets/play.svg";
      this.musicPlayerService.pause();
    }
    else {
      this.src = "/assets/pause.svg";
      this.musicPlayerService.playPlaylist(this.playlist);
    }
  }

  likePlaylist(event: Event, playlist: Playlist) {
    event.stopPropagation();
    this.playlistService.addFollower(playlist.id, this.userId);

    this.showShareMessage = false;
    this.showLikedMessage = true;
    setTimeout(() => {
      this.showLikedMessage = false;
    }, 1000);
  }

  sharePlaylist(event: Event, playlist: Playlist) {
    event.stopPropagation();
    const str: string = 'localhost:4200/playlist/' + playlist.id;
    this.clipboard.copy(str);

    this.showLikedMessage = false;
    this.showShareMessage = true;
    setTimeout(() => {
      this.showShareMessage = false;
    }, 1000);
  }

  savePlaylist(event: Event) {
    event.stopPropagation();
  }

  executeAction(event: Event) {
    event.stopPropagation();
  }

  isPausable(): boolean {
    return this.musicPlayerService.isPlaying && this.musicPlayerService.playlist.id == this.playlist.id;
  }
}