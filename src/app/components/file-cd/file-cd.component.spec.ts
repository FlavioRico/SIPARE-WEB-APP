import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCdComponent } from './file-cd.component';

describe('FileCdComponent', () => {
  let component: FileCdComponent;
  let fixture: ComponentFixture<FileCdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
