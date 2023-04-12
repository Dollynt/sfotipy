import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistRecomendadasComponent } from './pages/playlist-recomendadas/playlist-recomendadas.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './cadastro/cadastro.component';
import { CriarPlaylistComponent } from './criar-playlist/criar_playlist.component';
import { UserPlaylistsComponent } from './user-playlists/user_playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { PlaylistEmAltaComponent } from './playlist-em-alta/playlist-em-alta.component';
import { MusicasEmAltaComponent } from './musicas-em-alta/musicas-em-alta.component';
import { ArtistasEmAltaComponent } from './artistas-em-alta/artistas-em-alta.component';

const routes: Routes = [
  { path: 'criar_playlist', component: CriarPlaylistComponent },
  { path: 'minhas_playlists', component: UserPlaylistsComponent },
  { path: 'playlist/:id', component: PlaylistComponent },
  { path: 'playlistsrecomendadas', component: PlaylistRecomendadasComponent },
  { path: 'playlistsrecomendadas', component: PlaylistRecomendadasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: RegisterComponent },
  // { path: 'playlistemalta', component: PlaylistEmAltaComponent},
  // { path: 'musicasemalta', component: MusicasEmAltaComponent},
  // { path: 'artistasemalta', component: ArtistasEmAltaComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
