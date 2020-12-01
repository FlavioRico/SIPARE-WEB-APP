import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreavisoComponent } from './preaviso.component';

describe('PreavisoComponent', () => {
  let component: PreavisoComponent;
  let fixture: ComponentFixture<PreavisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreavisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreavisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
