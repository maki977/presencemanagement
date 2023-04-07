import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaddeditComponent } from './formaddedit.component';

describe('FormaddeditComponent', () => {
  let component: FormaddeditComponent;
  let fixture: ComponentFixture<FormaddeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormaddeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormaddeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
