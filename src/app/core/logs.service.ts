import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) { }

  url = environment.apiUrl + '/logs';

  getListarTiposDeLogs() {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    return this.http.get(`${this.url}/listar_tipos_de_logs`, {headers})
  }

  getListarLogs(tipo: string, pagina: number, quantidade: number) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    let params = {
      tipo: tipo,
      pagina: pagina,
      quantidade: quantidade
    }

    return this.http.get(`${this.url}/listar_logs`, {headers, params})
  }

  getContarLogs(tipo: string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    let params = {
      tipo: tipo
    }

    return this.http.get(`${this.url}/contar_logs`, {headers, params})
  }
}
