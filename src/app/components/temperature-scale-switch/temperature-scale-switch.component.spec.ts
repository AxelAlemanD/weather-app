import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureScaleSwitchComponent } from './temperature-scale-switch.component';

describe('TemperatureScaleSwitchComponent', () => {
  let component: TemperatureScaleSwitchComponent;
  let fixture: ComponentFixture<TemperatureScaleSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemperatureScaleSwitchComponent]
    });
    fixture = TestBed.createComponent(TemperatureScaleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
