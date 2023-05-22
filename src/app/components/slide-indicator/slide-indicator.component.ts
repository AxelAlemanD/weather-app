import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-indicator',
  templateUrl: './slide-indicator.component.html',
  styleUrls: ['./slide-indicator.component.scss']
})
export class SlideIndicatorComponent implements OnInit {

  @Input() cities: any[] = [];
  @Input() currentSlide: number = 0;

  constructor() { }

  ngOnInit(): void { }

}
