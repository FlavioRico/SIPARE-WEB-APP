import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionOrdenanteComponent } from './institucion-ordenante.component';

describe('InstitucionOrdenanteComponent', () => {
  let component: InstitucionOrdenanteComponent;
  let fixture: ComponentFixture<InstitucionOrdenanteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionOrdenanteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionOrdenanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
