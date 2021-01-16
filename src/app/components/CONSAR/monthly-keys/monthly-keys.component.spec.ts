import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyKeysComponent } from './monthly-keys.component';

describe('MonthlyKeysComponent', () => {
  let component: MonthlyKeysComponent;
  let fixture: ComponentFixture<MonthlyKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthlyKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
