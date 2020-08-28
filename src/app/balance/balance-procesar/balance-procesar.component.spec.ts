import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceProcesarComponent } from './balance-procesar.component';

describe('BalanceProcesarComponent', () => {
  let component: BalanceProcesarComponent;
  let fixture: ComponentFixture<BalanceProcesarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceProcesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceProcesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
