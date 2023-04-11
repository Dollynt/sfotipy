import { Component } from '@angular/core';
import { PlaylistService } from '../../playlist.service';
import { Category } from '../../../../../common/category';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-criacao-categorias',
  templateUrl: './criacao-categorias.component.html',
  styleUrls: ['./criacao-categorias.component.scss']
})

export class CriacaoCategoriasComponent {

  playlistId: number = 0;
  playlistCategories: Category[] = [];
  allCategories: Category[] = [];

  constructor(private playlistService: PlaylistService, private route: ActivatedRoute, private router: Router) { };

  addNewCategory(category: Category) {
    this.playlistService.addNewCategory(this.playlistId, category)
      .subscribe(
        ar => {
          if (ar) {
            //this.playlistCategories.push(category);
            var idx = this.playlistCategories.findIndex(ar => ar.name == category.name);
            if (idx == -1) {
              this.playlistCategories.push(category);
            }
          }
        }
      )
  }

  deleteCategory(category: Category) {
    this.playlistService.deleteCategory(this.playlistId, category)
      .subscribe(
        ar => {
          if (ar) {
            console.log(ar.name);
            var idx = this.playlistCategories.findIndex(ar => ar.name == category.name);
            if (idx != -1) {
              this.playlistCategories.splice(idx, 1);
            }
          }
        }
      )
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.playlistId = id;


    this.playlistService.getAllCategories()
      .subscribe(
        as => { this.allCategories = as },
        msg => { alert(msg.message) }
      )

    this.playlistService.getPlaylistCategories(this.playlistId)
      .subscribe(
        as => { this.playlistCategories = as },
        msg => { alert(msg.message) }
      )

    //this.getPlaylistCategories(this.playlistId);
    //this.getAllCategories();
  }

}
