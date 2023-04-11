import { Component } from '@angular/core';
import { tap } from 'rxjs/operators';

import { LoginService } from '../../login.service';
import { PlaylistService } from '../../playlist.service';
import { Playlist } from '../../../../../common/playlist';
import { Category } from '../../../../../common/category';
import { Music } from '../../../../../common/music';
import { UserService } from 'src/app/user.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  playlists: Playlist[] = [];
  playlistsTrending: Playlist[] = [];
  playlistsRecommended: Playlist[] = [];
  playlistsPublic: Playlist[] = [];
  playlistsUser: Playlist[] = [];
  isLogged: boolean = false;
  userId: number = 0;

  constructor(private playlistService: PlaylistService, private loginService: LoginService, private userService: UserService, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Sfotipy");
    this.loginService.getLoginStatus().subscribe(newStatus => {
      this.isLogged = newStatus;
    });

    this.playlistService.getPlaylists().subscribe(
      as => { this.playlists = as;
        
              this.userService.getUserId().subscribe(
                as => { this.userId = as; },
                msg => { alert(msg.message); }
              );

              this.playlistsPublic = this.playlists.filter((playlist) => playlist.availability === "public"); 
              this.playlistsUser = this.playlists.filter(playlist => playlist.ownerId === this.userId);
              this.playlistsTrending = this.playlists.sort((a, b) => b.followers.length - a.followers.length).splice(0,5);

              //this.playlistsRecommended = this.playlistsPublic.sort((a, b) => b.followers.length - a.followers.length).slice(0, 3);
              this.playlistService.recommendPlaylists(this.playlistsUser, this.playlists).subscribe(
                as => { this.playlistsRecommended = as; },
                msg => { alert(msg.message); }
              );
            },
      msg => { alert(msg.message); }
    );
  }
}
