import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriacaoCategoriasComponent } from './criacao-categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('CriacaoCategoriasComponent', () => {
  let component: CriacaoCategoriasComponent;
  let fixture: ComponentFixture<CriacaoCategoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [CriacaoCategoriasComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1'
              }
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CriacaoCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
