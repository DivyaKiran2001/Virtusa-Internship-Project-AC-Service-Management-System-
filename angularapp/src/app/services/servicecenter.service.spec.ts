import { TestBed } from '@angular/core/testing';

import { ServicecenterService } from './servicecenter.service';

describe('ServicecenterService', () => {
  let service: ServicecenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicecenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
