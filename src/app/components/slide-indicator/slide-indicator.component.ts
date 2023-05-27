import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-slide-indicator',
  templateUrl: './slide-indicator.component.html',
  styleUrls: ['./slide-indicator.component.scss']
})
export class SlideIndicatorComponent implements OnInit {

  @Input() cities: any[] = [];
  @Input() currentSlide: number = 0;
  @Output() slideIndexChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  showSlide(index: number) {
    if (index >= 0 && index < this.cities.length) {
      this.slideIndexChange.emit(index);
      this.currentSlide = index;
    }
  }
}
