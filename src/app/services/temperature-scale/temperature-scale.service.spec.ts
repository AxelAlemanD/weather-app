import { TestBed } from '@angular/core/testing';

import { TemperatureScaleService } from './temperature-scale.service';

describe('TemperatureScaleService', () => {
  let service: TemperatureScaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TemperatureScaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
