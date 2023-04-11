import { Component } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { MusicasService } from 'src/app/musicas.service';
import { PlaylistService } from 'src/app/playlist.service';

import { Music } from '../../../../../common/music';
import { Playlist } from '../../../../../common/playlist';
import { Category } from '../../../../../common/category';
import { CategoryService } from 'src/app/category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-page-busca',
  templateUrl: './page-busca.component.html',
  styleUrls: ['./page-busca.component.scss']
})
export class PageBuscaComponent {
  link = '/assets/playlists/1/cover.png';
  id = '2';
  filterText: string = '';

  musicIsActive: boolean = true;
  playlistIsActive: boolean = true;

  showAllMusic: boolean = false;
  showAllPlaylist: boolean = false;

  playlists: Playlist[] = [];
  musics: Music[] = [];
  categories: Category[] = [];

  selectedCategories: Category[] = [];

  selectedOptions: string[] = [];

  constructor(
    private musicasService: MusicasService,
    private playlistService: PlaylistService,
    private categoryService: CategoryService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle("Busca")
    this.musicasService.getMusics()
      .subscribe(
        as => { this.musics = as; },
        msg => { alert(msg.message); }
      );
    this.playlistService.getPlaylists()
      .subscribe(
        as => { this.playlists = as; },
        msg => { alert(msg.message); }
      );
    this.categories = this.categoryService.getCategories();
  }

  activateMusicas() {
    this.musicIsActive = !this.musicIsActive;
  }

  activatePlaylists() {
    this.playlistIsActive = !this.playlistIsActive;
  }

  getCategories(): Category[] {
    return this.categories.filter(c => !this.selectedCategories.includes(c));
  }

  getCategoriesId(): number[] {
    return this.selectedCategories.map(c => c.id);
  }

  selectCategory(category: Category): void {
    this.selectedCategories.push(category);
  }

  removeCategory(category: Category): void {
    let index = this.selectedCategories.findIndex(c => c.id === category.id);
    this.selectedCategories.splice(index, 1);
  }
}
