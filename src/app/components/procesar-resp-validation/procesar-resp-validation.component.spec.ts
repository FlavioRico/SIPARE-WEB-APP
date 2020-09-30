import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesarRespValidationComponent } from './procesar-resp-validation.component';

describe('ProcesarRespValidationComponent', () => {
  let component: ProcesarRespValidationComponent;
  let fixture: ComponentFixture<ProcesarRespValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcesarRespValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcesarRespValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
