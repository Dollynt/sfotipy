import { Component, Input } from '@angular/core';
import { Music } from '../../../../common/music';
import { CategoryService } from '../category.service';
import { MusicPlayerService } from '../services/music-player.service';
import { ActivatedRoute } from '@angular/router';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-music-card',
  templateUrl: './music-card.component.html',
  styleUrls: ['./music-card.component.scss']
})
export class MusicCardComponent {
  @Input() name!: string;
  @Input() author!: string;

  @Input() id!: number;
  @Input() music!: Music;

  @Input() isDeletable!: boolean;

  category: string;
  playlistId: number = 0
  constructor(private categoryService: CategoryService, public musicPlayerService: MusicPlayerService, private route: ActivatedRoute, private playlistService: PlaylistService) {
    this.category = "";
  }

  ngOnInit() {
    this.category = this.categoryService.getCategorybyId(this.music?.category)?.name || "";
    this.route.paramMap.subscribe(params => {
      this.playlistId = Number(params.get('id'));
    })
  }

  playMusic() {
    if (!this.musicPlayerService.isPlaying && this.musicPlayerService.currentMusic.id == this.music.id) {
      this.musicPlayerService.play();
    } else {
      this.musicPlayerService.playMusic(this.music);
    }
  }

  pauseMusic() {
    this.musicPlayerService.pause();
  }

  isPausable(): boolean {
    return this.musicPlayerService.isPlaying && this.musicPlayerService.currentMusic.id == this.music.id;
  }

  deletarMusic() {
    const deletarMusic = this.playlistService.deleteMusic(this.id, this.playlistId).subscribe()
    if (deletarMusic) {
      alert('Música deletada com sucesso')
      window.location.reload();
    }

  }
}
