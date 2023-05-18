import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyWeatherCardComponent } from './hourly-weather-card.component';

describe('HourlyWeatherCardComponent', () => {
  let component: HourlyWeatherCardComponent;
  let fixture: ComponentFixture<HourlyWeatherCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyWeatherCardComponent]
    });
    fixture = TestBed.createComponent(HourlyWeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
