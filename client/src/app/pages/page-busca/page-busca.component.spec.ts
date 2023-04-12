import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuscaComponent } from './page-busca.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MusicsFilterPipe } from 'src/app/pipes/musics-filter.pipe';
import { PlaylistsFilterPipe } from 'src/app/pipes/playlists-filter.pipe';

describe('PageBuscaComponent', () => {
  let component: PageBuscaComponent;
  let fixture: ComponentFixture<PageBuscaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [PageBuscaComponent, MusicsFilterPipe, PlaylistsFilterPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageBuscaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
