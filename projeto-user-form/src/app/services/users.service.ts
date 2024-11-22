import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserResponse } from '../interfaces/users/user.interface';

const API_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  constructor(private readonly _http: HttpClient) { }

  getUsers(): Observable<IUserResponse[]> {
    return this._http.get<IUserResponse[]>(`${API_URL}/users`)
  }

  getUserById(id: number): Observable<IUserResponse> {
    return this._http.get<IUserResponse>(`${API_URL}/users/${id}`)
  }

  editUserByIndex(index: number, params: any): Observable<any> {
    return this._http.put<any>(`${API_URL}/users/${index}`, params)
  }
}
