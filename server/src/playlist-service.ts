import { Category } from '../../common/category';
import { Playlist } from '../../common/playlist'
import { CategoryService } from './category-service';

export class PlaylistService {

  playlists: Playlist[] = [
    new Playlist(<Playlist>{
      "id": 0,
      "name": "Mix de Coldplay",
      "categories": [1],
      "musics": [0, 1, 2, 3, 4, 5, 6, 7, 8],
      "image": "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2f679c136425765.61f96b4f03c85.jpg",
      "link": "",
      "owner": "",
      "followers": [0, 1],
      "availability": "public"
    }),
    new Playlist(<Playlist>{
      'id': 1,
      'name': 'Melhores Pop',
      'categories': [1],
      'musics': [1],
      'image':
        'https://cdn.ibispaint.com/movie/190/771/190771621/image190771621l.png',
      'link': '',
      'owner': 'sfotipy',
      'followers': [],
      'availability': 'public'
    }),
    new Playlist(<Playlist>{
      'id': 2,
      'name': 'Melhores Indie',
      'categories': [3],
      'musics': [1, 2],
      'image':
        'https://i.pinimg.com/originals/5c/0b/34/5c0b34be1d361293b0bd2eb124967cd9.png',
      'link': '',
      'owner': 'sfotipy',
      'followers': [],
      'availability': 'public'
    }),
    new Playlist(<Playlist>{
      'id': 3,
      'name': 'Para Você',
      'categories': [2],
      'musics': [0, 1, 2],
      'image':
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVzSe2QANTVbnbNBQX3qMXejQHPLRBtAMDgA&usqp=CAU',
      'link': '',
      'owner': 'sfotipy',
      'followers': [],
      'availability': 'private'
    }),
    new Playlist(<Playlist>{
      'id': 4,
      'name': 'Para Dormir',
      'categories': [4],
      'musics': [1, 2],
      'image':
        'https://thumbs.dreamstime.com/b/listen-to-sleep-music-color-line-icon-autonomous-sensory-meridian-response-sound-waves-as-symbol-enjoying-sounds-editable-211152511.jpg',
      'link': '',
      'owner': 'sfotipy',
      'followers': [1,2],
      'availability': 'public'
    }),
    new Playlist(<Playlist>{
      'id': 5,
      'name': 'Melhores Rock',
      'categories': [2, 4],
      'musics': [1],
      'image':
        'https://assets.dragoart.com/images/140589_502/how-to-draw-strange-music-logo-strange-music-step-5_5e4cb46a6013c9.70891777_74088_5_3.gif',
      'link': '',
      'owner': 'sfotipy',
      'followers': [],
      'availability': 'public'
    }),
    new Playlist(<Playlist>{
      "id": 6,
      "name": "Rocking with Imagine Dragons",
      "categories": [3,5],
      "musics": [10, 11, 12, 13, 14],
      "image": "https://i.pinimg.com/736x/98/e6/d8/98e6d8ab4d4414eef0e90bb1382bfb86.jpg",
      "link": "",
      "owner": "",
      "followers": [1,2,3,4],
      "availability": "public"
    }),
    new Playlist(<Playlist>{
      "id": 7,
      "name": "Eminem's Greatest Hits",
      "categories": [1, 4],
      "musics": [15, 16, 17],
      "image": "https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/eminem-miracle-studio.jpg",
      "link": "",
      "owner": "",
      "followers": [],
      "availability": "public"
    }),
    new Playlist(<Playlist>{
      "id": 8,
      "name": "League of Legends Mix",
      "categories": [1, 6],
      "musics": [18, 19, 20],
      "image": "https://cdns-images.dzcdn.net/images/artist/21e53b8e8285f84f60601d895c39c900/500x500.jpg",
      "link": "",
      "owner": "",
      "followers": [1,2,3,4],
      "availability": "public"
    }),
    new Playlist(<Playlist>{
      "id": 9,
      "name": "The NBHD",
      "categories": [2, 1],
      "musics": [21, 22, 23, 24],
      "image": "https://i.pinimg.com/564x/78/35/fb/7835fb0bef03a3332c89c681f020da87--music-bands-.jpg",
      "link": "",
      "owner": "",
      "followers": [],
      "availability": "public"
    })
  ];

  idCount: number = 10;
  categories: Category[] = [];

  categoryService: CategoryService = new CategoryService;

  addPlaylist(playlist: Playlist): Playlist[] {
    playlist.id = this.idCount;
    this.playlists.push(playlist);
    this.idCount++
    return this.playlists;
  }

  getUserPlaylists(ownerName: any): Playlist[] {
    const playlistsReturn: Playlist[] = []
    for (const playlist of this.playlists) {

     // console.log(ownerId, playlist.ownerId)
     if (playlist.ownerId == ownerId) {

     //if (playlist.owner == ownerName) {

      playlistsReturn.push(playlist)
     }
    }
    return playlistsReturn;
  }

  verificarNomePlaylistExistente(nomePlaylist: string): boolean {
    const playlists = this.getUserPlaylists(this.idCount)
    for (let playlist of this.playlists) {
      if (playlist.name === nomePlaylist) {
        return true;
      } 
    }
    return false;
  }

  get(): Playlist[] {
    return this.playlists;
  }

  getById(playlistId: number): Playlist | undefined {
    return this.playlists.find(({ id }) => id == playlistId);
  }


  update(playlist: Playlist): Playlist | null {
    const result = this.playlists.find(c => c.id == playlist.id);
    if (result instanceof Playlist) {
      result.update(<Playlist>playlist);
      return result;
    } else {
      return null;
    }
  }

  updatePlaylist(playlist: Playlist): Playlist|null {
    const result = this.playlists.find(c => c.id == playlist.id);
    if (result) {
      this.playlists[this.playlists.indexOf(result)] = playlist;
      return result;
    } else {
      return null;
    }
  }

  delete(id: number): boolean {
    const index = this.playlists.findIndex(c => c.id === id);
    if (index >= 0) {
      this.playlists.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  addNewCategory(playlistId: number, category: number): Playlist | null {
    const playlist = this.getById(playlistId);
    if (!playlist) return null;
    if (playlist.categories.length >= 2) {
      return null;
    }
    // playlist.categories.push(category);
    var idx = playlist.categories.findIndex(ar => ar == category);
    if (idx == -1) {
      playlist.categories.push(category);
    }
    return playlist;
  }

  deleteCategory(playlistId: number, category: number): Playlist | null {
    const playlist = this.getById(playlistId);
    if (playlist?.categories.includes(category)) {
      var idx = playlist.categories.findIndex(ar => ar == category);
      if (idx != -1) {
        playlist.categories.splice(idx, 1);
      }
    } else {
      return null;
    }
    return playlist;
  }

  getPlaylistCategory(playlistId: number): Category[] {
    const playlist = this.getById(playlistId);
    const playlistCategories = playlist.categories;

    var categories: Category[] = [];
    playlistCategories.forEach(categoryId => {
      categories.push(this.categoryService.getById(categoryId));
    });

    return categories;
  }

  addFollower(idPlaylist: number, idUser: number): void {
    if(!this.playlists[idPlaylist].followers.includes(idUser))
      this.playlists[idPlaylist].followers.push(idUser);
  }
}
