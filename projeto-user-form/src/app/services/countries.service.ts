import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICountries } from '../interfaces/countries/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private readonly _http: HttpClient) { }

  getCountries(): Observable<ICountries> {
    return this._http.get<ICountries>(`https://countriesnow.space/api/v0.1/countries/positions`)
  }
}
