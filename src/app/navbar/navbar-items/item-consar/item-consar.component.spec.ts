import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCONSARComponent } from './item-consar.component';

describe('ItemCONSARComponent', () => {
  let component: ItemCONSARComponent;
  let fixture: ComponentFixture<ItemCONSARComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCONSARComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCONSARComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
