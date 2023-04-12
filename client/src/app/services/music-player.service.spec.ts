import { TestBed } from '@angular/core/testing';

import { MusicPlayerService } from './music-player.service';
import { HttpClientModule } from '@angular/common/http';
import { Music } from '../../../../common/music';
import { Playlist } from '../../../../common/playlist';

describe('MusicPlayerService', () => {
  let service: MusicPlayerService;
  let music: Music;
  let playlist: Playlist;

  beforeAll(() => {
    music = new Music(<Music>{ 'id': 0, 'name': "Hymn for the Weekend", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 3 });
    playlist = new Playlist(<Playlist><unknown>{
      "id": 0,
      "name": "Mix de Coldplay",
      "categories": [1],
      "musics": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "image": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2f679c136425765.61f96b4f03c85.jpg",
      "link": "",
      "owner": "João",
      "followers": ['a', 'b'],
      "availability": "public",
      "accessPlaylits": 4,
      "ownerId": 1
    })
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MusicPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play music', () => {
    spyOn(service, 'play');
    service.playMusic(music);
    expect(service.currentMusic).toEqual(music);
    expect(service.audio.src).toContain(music.id.toString());
    expect(service.play).toHaveBeenCalled();
  });

  it('should pause music', () => {
    spyOn(service, 'pause');
    service.pause();
    expect(service.isPlaying).toBeFalse();
    expect(service.pause).toHaveBeenCalled();
  });

  it('should play playlist', async () => {
    spyOn(service, 'play');
    service.playPlaylist(playlist);
    await new Promise(resolve => setTimeout(resolve, 1000))
    expect(service.playlist).toEqual(playlist);
    expect(service.currentMusic.id).toEqual(playlist.musics[0]);
    expect(service.audio.src).toContain(playlist.musics[0].toString());
    expect(service.play).toHaveBeenCalled();
  });

  it('should play next music', async () => {
    spyOn(service, 'play');
    service.playPlaylist(playlist);
    await new Promise(resolve => setTimeout(resolve, 1000))
    service.next();
    expect(service.currentMusic.id).toEqual(playlist.musics[1]);
    expect(service.audio.src).toContain(playlist.musics[1].toString());
    expect(service.play).toHaveBeenCalled();
  });

  it('should play previous music', async () => {
    spyOn(service, 'play');
    service.playPlaylist(playlist);
    await new Promise(resolve => setTimeout(resolve, 1000))
    service.next();
    expect(service.currentMusic.id).toEqual(playlist.musics[1]);
    service.back();
    expect(service.currentMusic.id).toEqual(playlist.musics[0]);
    expect(service.audio.src).toContain(playlist.musics[0].toString());
    expect(service.play).toHaveBeenCalled();
  });
});
