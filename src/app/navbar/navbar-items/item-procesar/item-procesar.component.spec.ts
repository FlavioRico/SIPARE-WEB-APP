import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPROCESARComponent } from './item-procesar.component';

describe('ItemPROCESARComponent', () => {
  let component: ItemPROCESARComponent;
  let fixture: ComponentFixture<ItemPROCESARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemPROCESARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPROCESARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
