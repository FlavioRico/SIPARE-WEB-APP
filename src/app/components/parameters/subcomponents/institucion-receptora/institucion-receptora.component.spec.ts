import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionReceptoraComponent } from './institucion-receptora.component';

describe('InstitucionReceptoraComponent', () => {
  let component: InstitucionReceptoraComponent;
  let fixture: ComponentFixture<InstitucionReceptoraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionReceptoraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionReceptoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
