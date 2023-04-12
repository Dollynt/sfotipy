import { Component } from '@angular/core';
import { MusicasService } from '../musicas.service';
import { Music } from '../../../../common/music';

@Component({
  selector: 'app-artistas-em-alta',
  templateUrl: './artistas-em-alta.component.html',
  styleUrls: ['./artistas-em-alta.component.scss']
})
export class ArtistasEmAltaComponent {

  mostAccessedSongs: Music[] = [];

  constructor(private MusicasService: MusicasService) { }

  ngOnInit() {
    this.MusicasService.getMusics().subscribe(as => {
      this.mostAccessedSongs = as
      this.mostAccessedSongs.sort((a, b) => b.accessSong - a.accessSong).slice(0, 8)
    });
  }
  getFirstMusicAuthor(): string {
    return this.mostAccessedSongs[0]?.image;
  }
  getSecondMusicAuthor(): string {
    return this.mostAccessedSongs[1]?.image;
  }
  getThirdMusicAuthor(): string {
    return this.mostAccessedSongs[2]?.image;
  }
  getFourthMusicAuthor(): string {
    return this.mostAccessedSongs[3]?.image;
  }
  getFifthMusicAuthor(): string {
    return this.mostAccessedSongs[4]?.image;
  }

}
