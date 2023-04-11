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

  constructor( private MusicasService: MusicasService) {}

  ngOnInit(){
    this.MusicasService.getMusics().subscribe(as => {
      this.mostAccessedSongs = as
      this.mostAccessedSongs.sort((a, b) => b.accessSong - a.accessSong).slice(0, 5)});
  }
  getFirstMusicAuthor(): string {
    return this.mostAccessedSongs[0].image;
  }
  getSecondMusicAuthor(): string {
    return this.mostAccessedSongs[1].image;
  }
  getThirdMusicAuthor(): string {
    return this.mostAccessedSongs[2].image;
  }
  getFourthMusicAuthor(): string {
    return this.mostAccessedSongs[3].image;
  }
  getFifthMusicAuthor(): string {
    return this.mostAccessedSongs[4].image;
  }


  // mostAccessedSongs: Music[] = [
  //   new Music(<Music>{ 'id': 0, 'name': "Hymn for the Weekend", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/6/61/Coldplay_Hymn_for_the_Weekend.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 20 }),
  //   new Music(<Music>{ 'id': 1, 'name': "Viva la Vida", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/d/d7/Vivalavida.jpg", 'link': "", 'duration': 500, 'category': 2, 'accessSong': 3 }),
  //   new Music(<Music>{ 'id': 2, 'name': "Yellow", 'author': "Coldplay", 'image': "https://i.pinimg.com/originals/f7/30/23/f7302371fb79c2d0cd817e9c28baaf62.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 6 }),
  //   new Music(<Music>{ 'id': 3, 'name': "Paradise", 'author': "Coldplay", 'image': "https://cdns-images.dzcdn.net/images/cover/e0dd8263dfed37c50a868abbf65fd7da/500x500.jpg", 'link': "", 'duration': 500, 'category': 1, 'accessSong': 40 }),
  //   new Music(<Music>{ 'id': 4, 'name': "The Scientist", 'author': "Coldplay", 'image': "https://qph.cf2.quoracdn.net/main-qimg-9488341d4770aca142f13919807a8a41.webp", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 78 }),
  //   new Music(<Music>{ 'id': 5, 'name': "A Sky Full of Stars", 'author': "Coldplay", 'image': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST88mVwsW3uPveto6AGE-Nz4Llqb9dZyoIfPd91Brc2A&s", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 13 }),
  //   new Music(<Music>{ 'id': 6, 'name': "Let Somebody Go", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/7/7d/Let_Somebody_Go_-_Coldplay_e_Selena_Gomez.png", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 90 }),
  //   new Music(<Music>{ 'id': 7, 'name': "Something Just Like This", 'author': "Coldplay", 'image': "https://i1.sndcdn.com/artworks-000252497555-rdia79-t500x500.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 38 }),
  //   new Music(<Music>{ 'id': 8, 'name': "Clocks", 'author': "Coldplay", 'image': "https://upload.wikimedia.org/wikipedia/pt/9/96/Clocks_single.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 88 }),
  //   new Music(<Music>{ 'id': 9, 'name': "Another Day in Paradise", 'author': "Phil Collins", 'image': "https://upload.wikimedia.org/wikipedia/en/thumb/5/53/Phil_Collins_AnotherDayInParadise.jpg/220px-Phil_Collins_AnotherDayInParadise.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 78 }),
  //   new Music(<Music>{ 'id': 10, 'name': "Believer", 'author': "Imagine Dragons", 'image': "https://upload.wikimedia.org/wikipedia/pt/thumb/9/90/Believer_Imagine_Dragons.jpg/220px-Believer_Imagine_Dragons.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 60 }),
  //   new Music(<Music>{ 'id': 11, 'name': "Radioactive", 'author': "Imagine Dragons", 'image': "https://upload.wikimedia.org/wikipedia/pt/thumb/e/e9/Capa_de_Radioactive_%28Imagine_Dragons%29.jpg/220px-Capa_de_Radioactive_%28Imagine_Dragons%29.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 99 }),
  //   new Music(<Music>{ 'id': 12, 'name': "Demons", 'author': "Imagine Dragons", 'image': "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d0/Imagine_Dragons_-_Demons.jpg/220px-Imagine_Dragons_-_Demons.jpg", 'link': "", 'duration': 500, 'category': 3 , 'accessSong': 7}),
  //   new Music(<Music>{ 'id': 13, 'name': "On Top of the World", 'author': "Imagine Dragons", 'image': "https://upload.wikimedia.org/wikipedia/pt/thumb/f/f8/Imagine_Dragons_On_Top_of_the_World.jpg/220px-Imagine_Dragons_On_Top_of_the_World.jpg", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 56 }),
  //   new Music(<Music>{ 'id': 14, 'name': "Thunder", 'author': "Imagine Dragons", 'image': "https://upload.wikimedia.org/wikipedia/pt/thumb/6/68/Imagine_Dragons_Thunder.png/220px-Imagine_Dragons_Thunder.png", 'link': "", 'duration': 500, 'category': 3, 'accessSong': 45 }),
  //   new Music(<Music>{ 'id': 15, 'name': "Lose Yourself", 'author': "Eminem", 'image': "https://upload.wikimedia.org/wikipedia/pt/d/d6/Lose_Yourself.jpg", 'link': "", 'duration': 500, 'category': 2, 'accessSong': 35 }),
  //   new Music(<Music>{ 'id': 16, 'name': "Love The Way You Lie ft. Rihanna", 'author': "Eminem", 'image': "https://upload.wikimedia.org/wikipedia/pt/c/cb/Eminem_Rihanna_Love_The_Way_You_Lie.jpg", 'link': "", 'duration': 500, 'category': 2, 'accessSong': 12 }),
  //   new Music(<Music>{ 'id': 17, 'name': "The Real Slim Shady", 'author': "Eminem", 'image': "https://i.scdn.co/image/ab67616d00001e02dbb3dd82da45b7d7f31b1b42", 'link': "", 'duration': 500, 'category': 2, 'accessSong': 87 }),
  //   new Music(<Music>{ 'id': 18, 'name': 'Legends Never Die', 'author': 'Against the Current', 'image': 'https://i.ytimg.com/vi/r6zIGXun57U/maxresdefault.jpg', 'link': 'https://www.youtube.com/watch?v=r6zIGXun57U', 'duration': 227, 'category': 1, 'accessSong': 34 }),
  //   new Music(<Music>{ 'id': 19, 'name': 'Phoenix', 'author': 'Cailin Russo, Chrissy Costanza', 'image': '', 'link': 'https://www.youtube.com/watch?v=eE9tSJA-7hc', 'duration': 222, 'category': 1, 'accessSong': 76 }),
  //   new Music(<Music>{ 'id': 20, 'name': 'Rise', 'author': 'The Glitch Mob, Mako, and The Word Alive', 'image': 'https://static.wikia.nocookie.net/leagueoflegends/images/2/2b/Rise_Single_Cover.jpg/revision/latest/scale-to-width-down/1000?cb=20180913021319', 'link': 'https://www.youtube.com/watch?v=fB8TyLTD7EE', 'duration': 257, 'category': 1, 'accessSong': 76 }),
  //   new Music(<Music>{ 'id': 21, 'name': 'Sweater Weather', 'author': 'The Neighbourhood', 'image': 'https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921', 'link': '', 'duration': 213, 'category': 1, 'accessSong': 67 }),
  //   new Music(<Music>{ 'id': 22, 'name': 'Daddy Issues', 'author': 'The Neighbourhood', 'image': 'https://i.scdn.co/image/ab67616d0000b2733066581d697fbdee4303d685', 'link': '', 'duration': 238, 'category': 1, 'accessSong':46 }),
  //   new Music(<Music>{ 'id': 23, 'name': 'Afraid', 'author': 'The Neighbourhood', 'image': 'https://upload.wikimedia.org/wikipedia/en/1/1f/Afraid_The_Neighbourhood.png', 'link': '', 'duration': 251, 'category': 1, 'accessSong': 200 }),
  //   new Music(<Music>{ 'id': 24, 'name': 'Cry Baby', 'author': 'The Neighbourhood', 'image': 'https://ih1.redbubble.net/image.540389728.5898/st,small,507x507-pad,600x600,f8f8f8.u2.jpg', 'link': '', 'duration': 221, 'category': 1 ,'accessSong':99})
  // ];
  // ngOnInit(){
  //   this.mostAccessedSongs = this.mostAccessedSongs.sort((a, b) => b.accessSong - a.accessSong).slice(0, 5);
  // }
  // getFirstMusicAuthor(): string {
  //   return this.mostAccessedSongs[0].image;
  // }
  // getSecondMusicAuthor(): string {
  //   return this.mostAccessedSongs[1].image;
  // }
  // getThirdMusicAuthor(): string {
  //   return this.mostAccessedSongs[2].image;
  // }
  // getFourthMusicAuthor(): string {
  //   return this.mostAccessedSongs[3].image;
  // }
  // getFifthMusicAuthor(): string {
  //   return this.mostAccessedSongs[4].image;
  // }


}
