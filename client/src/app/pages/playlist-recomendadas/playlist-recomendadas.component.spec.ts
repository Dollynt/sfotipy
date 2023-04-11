import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistRecomendadasComponent } from './playlist-recomendadas.component';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylistRecomendadasComponent', () => {
  let component: PlaylistRecomendadasComponent;
  let fixture: ComponentFixture<PlaylistRecomendadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlaylistRecomendadasComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlaylistRecomendadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
