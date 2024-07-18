import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Location} from "../core/model";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  private readonly _endpoint = `/v1/locations`;

  add(location: Location) {
    return this.http.post<Location>(`${environment.apiUrl}${this._endpoint}`, location);
  }

  findAll() {
    return this.http.get<Location[]>(`${environment.apiUrl}${this._endpoint}`);
  }

  delete(locationId: number) {
    return this.http.delete<void>(`${environment.apiUrl}${this._endpoint}/${locationId}`);
  }

  updateFavorite(locationId: number) {
    return this.http.put<void>(`${environment.apiUrl}${this._endpoint}/${locationId}`, null);
  }

}
