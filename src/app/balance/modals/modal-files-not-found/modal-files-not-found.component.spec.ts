import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFilesNotFoundComponent } from './modal-files-not-found.component';

describe('ModalFilesNotFoundComponent', () => {
  let component: ModalFilesNotFoundComponent;
  let fixture: ComponentFixture<ModalFilesNotFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFilesNotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFilesNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
