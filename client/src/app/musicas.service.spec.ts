import { TestBed } from '@angular/core/testing';

import { MusicasService } from './musicas.service';
import { HttpClientModule } from '@angular/common/http';

describe('MusicasService', () => {
  let service: MusicasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(MusicasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
