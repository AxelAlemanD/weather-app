import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({opacity: 0})),
      state('*', style({opacity: 1})),
      transition('void <=> *', animate('250ms ease-in-out'))
    ])
  ]
})
export class HomePage {

  showCitySearchResults: boolean = false;

  constructor() { }

  toggleCitySearchResultsComponent(event: any) {
    this.showCitySearchResults = (event.type === "ionFocus" && event.type !== "ionCancel");
  }

}
