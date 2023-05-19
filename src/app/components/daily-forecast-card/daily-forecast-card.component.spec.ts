import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyForecastCardComponent } from './daily-forecast-card.component';

describe('DailyForecastCardComponent', () => {
  let component: DailyForecastCardComponent;
  let fixture: ComponentFixture<DailyForecastCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyForecastCardComponent]
    });
    fixture = TestBed.createComponent(DailyForecastCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
