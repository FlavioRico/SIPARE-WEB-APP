import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidFileComponent } from './valid-file.component';

describe('ValidFileComponent', () => {
  let component: ValidFileComponent;
  let fixture: ComponentFixture<ValidFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
