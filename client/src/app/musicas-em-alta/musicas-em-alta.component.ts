import { Component } from '@angular/core';
import { MusicService } from '../../../../server/src/music-service';
import { Music } from '../../../../common/music';
@Component({
  selector: 'app-musicas-em-alta',
  templateUrl: './musicas-em-alta.component.html',
  styleUrls: ['./musicas-em-alta.component.scss']
})
export class MusicasEmAltaComponent {
  mostAccessedMusics: Music[] = [];

  music: Music = new Music(<Music>{ 'id': 0, 'name': "Hymn for the Weekend", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 3 });

  constructor(private musicService: MusicService) { }

  ngOnInit() {
    //this.mostAccessedMusics = this.musicService.getMostAccessed();
  }
}
