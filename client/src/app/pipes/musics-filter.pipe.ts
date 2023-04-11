import { Pipe, PipeTransform } from '@angular/core';
import { Music } from '../../../../common/music';
import { Playlist } from '../../../../common/playlist';

@Pipe({ name: 'musicsFilter' })
export class MusicsFilterPipe implements PipeTransform {

  transform(musics: Music[], filterText: string, filterCategory: number[]): Music[] {
    if (!musics) {
      return [];
    }
    if (!filterText && !filterCategory.length) {
      return musics;
    }

    return musics.filter(music => {
      return this.musicContainsFilterText(music, filterText, filterCategory);
    });
  }

  private musicContainsFilterText(music: Music, filterText: string, filterCategory: number[]): boolean {
    filterText = filterText.toLocaleLowerCase();
    const filterTerms = filterText.split(' ');
    for (const filterTerm of filterTerms) {
      const hasFilterTerm = this.musicContainsFilterTerm(music, filterTerm, filterCategory);
      if (hasFilterTerm === false) {
        return false;
      }
    }

    return true;
  }

  private musicContainsFilterTerm(music: Music, filterTerm: string, filterCategory: number[]) {
    return (!filterTerm || music.name.toLocaleLowerCase().includes(filterTerm)) && (!filterCategory.length || filterCategory.includes(music.category));
  }

}
