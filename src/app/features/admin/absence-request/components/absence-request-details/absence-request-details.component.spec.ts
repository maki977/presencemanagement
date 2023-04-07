import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbsenceRequestDetailsComponent } from './absence-request-details.component';

describe('AbsenceRequestDetailsComponent', () => {
  let component: AbsenceRequestDetailsComponent;
  let fixture: ComponentFixture<AbsenceRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbsenceRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbsenceRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
