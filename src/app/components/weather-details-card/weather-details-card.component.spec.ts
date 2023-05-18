import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherDetailsCardComponent } from './weather-details-card.component';

describe('WeatherDetailsCardComponent', () => {
  let component: WeatherDetailsCardComponent;
  let fixture: ComponentFixture<WeatherDetailsCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeatherDetailsCardComponent]
    });
    fixture = TestBed.createComponent(WeatherDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
