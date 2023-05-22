import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideIndicatorComponent } from './slide-indicator.component';

describe('SlideIndicatorComponent', () => {
  let component: SlideIndicatorComponent;
  let fixture: ComponentFixture<SlideIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideIndicatorComponent]
    });
    fixture = TestBed.createComponent(SlideIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
