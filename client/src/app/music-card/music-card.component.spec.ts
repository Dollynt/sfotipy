import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCardComponent } from './music-card.component';
import { HttpClientModule } from '@angular/common/http';

describe('MusicCardComponent', () => {
  let component: MusicCardComponent;
  let fixture: ComponentFixture<MusicCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [MusicCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MusicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
