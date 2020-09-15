import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeOperacionComponent } from './tipo-de-operacion.component';

describe('TipoDeOperacionComponent', () => {
  let component: TipoDeOperacionComponent;
  let fixture: ComponentFixture<TipoDeOperacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeOperacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeOperacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
