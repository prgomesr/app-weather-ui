import {Component} from '@angular/core';
import {AutoCompleteCompleteEvent, AutoCompleteModule, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {FormsModule} from "@angular/forms";
import {take} from "rxjs";
import {Location} from "../../../core/model";
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {WeatherService} from "../../../services/weather.service";

@Component({
  selector: 'app-location-search',
  standalone: true,
  imports: [
    AutoCompleteModule,
    FormsModule
  ],
  providers: [WeatherService],
  templateUrl: './location-search.component.html',
  styleUrl: './location-search.component.css'
})
export class LocationSearchComponent {
  selectedItem: any;
  suggestions: Location[] = [];

  constructor(private weatherService: WeatherService,
              private ref: DynamicDialogRef) {
  }

  search(event: AutoCompleteCompleteEvent) {
    this.weatherService.findAllLocationsByName(event.query)
      .pipe(
        take(1)
      ).subscribe(value => {
      this.suggestions = value;
    })
  }

  onCitySelected(event: AutoCompleteSelectEvent) {
    this.ref.close(event.value);
  }

}
