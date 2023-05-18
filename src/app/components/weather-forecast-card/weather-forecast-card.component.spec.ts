import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastCardComponent } from './weather-forecast-card.component';

describe('WeatherForecastCardComponent', () => {
  let component: WeatherForecastCardComponent;
  let fixture: ComponentFixture<WeatherForecastCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherForecastCardComponent]
    });
    fixture = TestBed.createComponent(WeatherForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
