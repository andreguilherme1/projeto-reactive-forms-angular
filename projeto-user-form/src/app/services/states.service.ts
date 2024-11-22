import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private readonly _http: HttpClient) { }

  getStates(countryName: string): Observable<any> {
    return this._http.post<any>(
        'https://countriesnow.space/api/v0.1/countries/states',
        { country: countryName }
    ).pipe(
        map((statesResponse) => {
            return statesResponse.data.states;
        }),
    );
}
}
