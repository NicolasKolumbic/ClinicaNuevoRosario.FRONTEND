import { TestBed } from '@angular/core/testing';

import { PanelManagmentService } from './panel-managment.service';

describe('PanelManagmentService', () => {
  let service: PanelManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanelManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
