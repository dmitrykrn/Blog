import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthNodeService {
  constructor(private http: HttpClient) {

  }

  rootURL = '/api';

  getUsers() {
    return this.http.get(this.rootURL + '/users');
  }


}
