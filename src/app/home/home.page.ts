import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  showCitySearchResults: boolean = false;

  constructor() { }

  toggleCitySearchResultsComponent(event: any) {
    this.showCitySearchResults = (event.type === "ionFocus" && event.type !== "ionCancel");
  }

}
