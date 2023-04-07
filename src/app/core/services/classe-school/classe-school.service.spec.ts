import { TestBed } from '@angular/core/testing';

import { ClasseSchoolService } from './classe-school.service';

describe('ClasseSchoolService', () => {
  let service: ClasseSchoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasseSchoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
