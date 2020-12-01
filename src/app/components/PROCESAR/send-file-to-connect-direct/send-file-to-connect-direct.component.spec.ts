import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendFileToConnectDirectComponent } from './send-file-to-connect-direct.component';

describe('SendFileToConnectDirectComponent', () => {
  let component: SendFileToConnectDirectComponent;
  let fixture: ComponentFixture<SendFileToConnectDirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendFileToConnectDirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendFileToConnectDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
