import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCardRecomendComponent } from './playlist-card-recomend.component';
import { HttpClientModule } from '@angular/common/http';

describe('PlaylistCardRecomendComponent', () => {
  let component: PlaylistCardRecomendComponent;
  let fixture: ComponentFixture<PlaylistCardRecomendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [PlaylistCardRecomendComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PlaylistCardRecomendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
