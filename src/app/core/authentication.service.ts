import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('token');
  url = environment.apiUrl + '/authentication';

  getListUsers() {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    return this.http.get(`${this.url}/list_users`, {headers})
  }

  postRegisterUser(user: any) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    return this.http.post(`${this.url}/register_user`, user, {headers})
  }

  putUpdateUser(user: any) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    return this.http.put(`${this.url}/update_user`, user, {headers})
  }

  deleteUser(user_email_to_delete:any ) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('user_email_to_delete', user_email_to_delete)

    return this.http.delete(`${this.url}/delete_user`, {headers, params})
  }
}
