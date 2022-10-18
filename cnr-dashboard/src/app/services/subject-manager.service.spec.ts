import { TestBed } from '@angular/core/testing';

import { SubjectManagerService } from './subject-manager.service';

describe('SubjectManagerService', () => {
  let service: SubjectManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
