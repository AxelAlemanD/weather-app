import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecastCardComponent } from './hourly-forecast-card.component';

describe('HourlyWeatherCardComponent', () => {
  let component: HourlyForecastCardComponent;
  let fixture: ComponentFixture<HourlyForecastCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyForecastCardComponent]
    });
    fixture = TestBed.createComponent(HourlyForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
