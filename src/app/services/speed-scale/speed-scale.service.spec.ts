import { TestBed } from '@angular/core/testing';

import { SpeedScaleService } from './speed-scale.service';

describe('SpeedScaleService', () => {
  let service: SpeedScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpeedScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
