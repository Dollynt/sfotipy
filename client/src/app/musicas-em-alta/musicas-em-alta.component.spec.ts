import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicasEmAltaComponent } from './musicas-em-alta.component';
import { MusicService } from '../../../../server/src/music-service';
import { HttpClientModule } from '@angular/common/http';

describe('MusicasEmAltaComponent', () => {
  let component: MusicasEmAltaComponent;
  let fixture: ComponentFixture<MusicasEmAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [MusicService],
      imports: [HttpClientModule],
      declarations: [MusicasEmAltaComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MusicasEmAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
