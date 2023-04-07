import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseSchoolComponent } from './classe-school.component';

describe('ClasseSchoolComponent', () => {
  let component: ClasseSchoolComponent;
  let fixture: ComponentFixture<ClasseSchoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasseSchoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasseSchoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
