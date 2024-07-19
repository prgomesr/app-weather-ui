import {Component} from '@angular/core';
import {WeatherService} from "../../../services/weather.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {take} from "rxjs";
import {Forecast, ForecastList} from "../../../core/model";
import {DecimalPipe, NgClass, NgForOf, NgIf, NgOptimizedImage, PercentPipe} from "@angular/common";
import {TemperaturePipe} from "../../../core/pipeline/temperature.pipe";
import {Button} from "primeng/button";
import {DataViewModule} from "primeng/dataview";
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {DayOfWeekPipe} from "../../../core/pipeline/day-of-week.pipe";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
  imports: [
    NgIf,
    NgOptimizedImage,
    DecimalPipe,
    TemperaturePipe,
    PercentPipe,
    Button,
    RouterLink,
    DataViewModule,
    NgForOf,
    NgClass,
    CardModule,
    DividerModule,
    DayOfWeekPipe,
    SkeletonModule
  ],
  providers: [WeatherService]
})
export class DetailComponent {
  forecast!: Forecast;
  nextFiveDays: ForecastList[] = [];
  loading = true;

  constructor(private route: ActivatedRoute,
              private weatherService: WeatherService) {
    const lat = Number(this.route.snapshot.paramMap.get('lat'));
    const lon = Number(this.route.snapshot.paramMap.get('lon'));
    this.loadForecast(lat, lon);
  }

  private loadForecast(lat: number, lon: number) {
    this.loading = true;
    this.weatherService.getForecastByLatAndLon(lat, lon)
      .pipe(
        take(1)
      ).subscribe(forecast => {
      this.loading = false;
      this.forecast = forecast;
      this.nextFiveDays = DetailComponent.getNextFiveDays(forecast);
    });
  }

  private static getNextFiveDays(forecast: Forecast) {
    let list = forecast.list.slice();
    list.shift();
    return list;
  }

}
