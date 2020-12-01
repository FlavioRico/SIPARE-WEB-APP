import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliationReportComponent } from './conciliation-report.component';

describe('ConciliationReportComponent', () => {
  let component: ConciliationReportComponent;
  let fixture: ComponentFixture<ConciliationReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConciliationReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConciliationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
