import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class HomePage {

  currentSlide: number = 0;
  showCitySearchResults: boolean = false;
  cities = ['city 1', 'city 2', 'city 3'];
  @ViewChild('swiper') swiperRef: ElementRef | undefined;

  constructor() { }

  toggleCitySearchResultsComponent(event: any) {
    this.showCitySearchResults = (event.type === "ionFocus" && event.type !== "ionCancel");
  }

  updateCurrentSlide() {
    this.currentSlide = this.swiperRef?.nativeElement.swiper.activeIndex;
  }

}
