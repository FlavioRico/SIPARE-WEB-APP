import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceConsarComponent } from './balance-consar.component';

describe('BalanceConsarComponent', () => {
  let component: BalanceConsarComponent;
  let fixture: ComponentFixture<BalanceConsarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceConsarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceConsarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
