import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    let params = new HttpParams()
    .set('tipo', tipo)
    .set('pagina', pagina)
    .set('quantidade', quantidade)

    return this.http.get(`${this.url}/listar_logs`, {headers, params})
  }

  getContarLogs(tipo: string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    let params = new HttpParams()
    .set('tipo', tipo)

    return this.http.get(`${this.url}/contar_logs`, {headers, params})
  }

  getObterNotificacoes(prefixo_empresa:string='', data_inicio:string='', data_fim:string='', pagina:number=1, quantidade:number=20, somente_contar:boolean=false) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`)

    let params = new HttpParams()
    .set('pagina', pagina)
    .set('quantidade', quantidade)
    .set('somente_contar', somente_contar)

    if (prefixo_empresa) {
      params = params.set('prefixo_empresa', prefixo_empresa)
    }

    if (data_inicio) {
      params = params.set('data_inicio', data_inicio)
    }

    if (data_fim) {
      params = params.set('data_fim', data_fim)
    }



    return this.http.get(`${this.url}/obter_notificacoes`, {headers, params})
  }
}
