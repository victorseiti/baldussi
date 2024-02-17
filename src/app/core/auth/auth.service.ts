import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + '/authentication'

  login(credentials:any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })

    let cred = `username=${credentials.username}&password=${credentials.password}`
    
    return this.http.post(this.url + '/authenticate_user', cred, {headers})
  }
}
