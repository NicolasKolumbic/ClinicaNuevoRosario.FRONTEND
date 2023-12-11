import { TestBed } from '@angular/core/testing';

import { AdministatorServiceService } from './administator-service.service';

describe('AdministatorServiceService', () => {
  let service: AdministatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
