import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CabeceraOpcMenusComponent } from './cabecera-opc-menus.component';

describe('CabeceraOpcMenusComponent', () => {
  let component: CabeceraOpcMenusComponent;
  let fixture: ComponentFixture<CabeceraOpcMenusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CabeceraOpcMenusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CabeceraOpcMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
