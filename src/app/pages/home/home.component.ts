import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle} from "@angular/common";
import {CardModule} from "primeng/card";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {LocationSearchComponent} from "./location-search/location-search.component";
import {Subject, take, takeUntil} from "rxjs";
import {LocationService} from "../../services/location.service";
import {Router} from "@angular/router";
import {DataViewModule} from "primeng/dataview";
import {TagModule} from "primeng/tag";
import {WeatherService} from "../../services/weather.service";
import {TemperaturePipe} from "../../core/pipeline/temperature.pipe";
import {Location, WeatherLocation} from "../../core/model";
import {ConfirmationService, MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {SkeletonModule} from "primeng/skeleton";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [ButtonModule, NgForOf, NgStyle, CardModule, DataViewModule, TagModule, NgClass, NgOptimizedImage, TemperaturePipe, ToastModule, ConfirmDialogModule, SkeletonModule, NgIf],
  providers: [DialogService, ConfirmationService, MessageService, LocationService, WeatherService]
})
export class HomeComponent implements OnInit, OnDestroy {
  locations: Weather[] = [];

  private $unsub = new Subject();
  onLoaded = true;

  constructor(private dialogService: DialogService,
              private locationService: LocationService,
              private weatherService: WeatherService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  private loadLocations() {
    this.onLoaded = true;
    this.clearLocations();
    this.locationService.findAll()
      .pipe(
        take(1)
      ).subscribe(value => {
      this.onLoaded = false;
      value.forEach(value => {
        this.locationToWeather(value);
      });
    });
  }

  private clearLocations() {
    this.locations = [];
  }

  private locationToWeather(location: Location) {
    this.onLoaded = true;
    this.weatherService.getWeatherByLatAndLon(location.lat, location.lon)
      .pipe(
        take(1)
      ).subscribe(weather => {
      this.onLoaded = false;
      this.locations.push(HomeComponent.getItems(weather, location));
      this.locations.sort((a, b) => (a.isFavorite === b.isFavorite) ? 0 : a.isFavorite ? -1 : 1);
    });
  }

  private static getItems(weather: WeatherLocation, location: Location) {
    return {
      id: location.id,
      city: weather.name + '/' + location.state,
      country: weather.sys.country,
      temperature: weather.main.temp,
      weather: weather.weather[0].description,
      icon: weather.weather[0].icon,
      lat: weather.coord.lat,
      lon: weather.coord.lon,
      isFavorite: location.favorite
    };
  }

  addLocation() {
    const ref = this.dialogService.open(LocationSearchComponent, {
      header: 'Selecione uma localização',
      width: '50%',
      height: '90%',
      contentStyle: {overflow: 'auto'},
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    this.handleReturnValue(ref);
  }

  private handleReturnValue(ref: DynamicDialogRef<LocationSearchComponent>) {
    ref.onClose
      .pipe(
        takeUntil(this.$unsub)
      ).subscribe(value => {
      if (value) {
        this.locationService.add(value)
          .pipe(
            take(1)
          ).subscribe(value => {
          this.goDetails(value.lat, value.lon);
        });
      }
    });
  }

  private goDetails(lat: number, lon: number) {
    this.router.navigate(
      [`/detail/${lat}/${lon}`]
    ).then();
  }

  seeDetails(lat: number, lon: number) {
    this.goDetails(lat, lon);
  }

  ngOnDestroy(): void {
    this.$unsub.next(null);
    this.$unsub.complete();
  }

  onDelete(id: number) {
    this.confirmationService.confirm({
      message: 'Você quer excluir este registro?',
      header: 'Confirmação de exclusão',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      rejectLabel: 'Não',
      acceptLabel: 'Sim',

      accept: () => {
        this.deleteLocation(id);
      }
    });
  }

  private deleteLocation(id: number) {
    this.locationService.delete(id)
      .pipe(
        take(1)
      ).subscribe(() => {
      this.loadLocations();
      this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Registro excluído'});
    });
  }

  addFavorite(id: number) {
    this.locationService.updateFavorite(id)
      .pipe(
        take(1)
      ).subscribe(() => {
      this.loadLocations();
      this.messageService.add({severity: 'info', summary: 'Confirmado', detail: 'Registro atualizado'});
    });
  }

}

interface Weather {
  id: number;
  city: string;
  country: string;
  temperature: number;
  weather: string;
  icon: string;
  lat: number;
  lon: number;
  isFavorite: boolean;
}
