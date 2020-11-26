import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcusesComponent } from './acuses.component';

describe('AcusesComponent', () => {
  let component: AcusesComponent;
  let fixture: ComponentFixture<AcusesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcusesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
