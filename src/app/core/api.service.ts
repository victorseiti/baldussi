import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('token');
  url = environment.apiUrl;

  getListarClientesCadastrados(pagina: number, quantidade: number) {
    let params = new HttpParams()
    .set('pagina', pagina)
    .set('quantidade', quantidade)

    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    return this.http.get(`${this.url}/clientes/listar_clientes_cadastrados`, {params, headers})
  }
}
