import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Forecast, Location, WeatherLocation} from "../core/model";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private readonly _endpoint = `/v1/weathers`;

  constructor(private http: HttpClient) {
  }

  findAllLocationsByName(name: string) {
    return this.http.get<Location[]>(`${environment.apiUrl}${this._endpoint}/locations`, {params: {name: name}});
  }

  getWeatherByLatAndLon(lat: number, lon: number) {
    return this.http.get<WeatherLocation>(`${environment.apiUrl}${this._endpoint}`, {params: {lat: lat, lon: lon}});
  }

  getForecastByLatAndLon(lat: number, lon: number) {
    return this.http.get<Forecast>(`${environment.apiUrl}${this._endpoint}/forecast`, {params: {lat: lat, lon: lon}});
  }

}
