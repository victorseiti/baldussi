import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  token = localStorage.getItem('token');
  url = environment.apiUrl + '/clientes';

  getListarClientesCadastrados(pagina: number, quantidade: number) {
    let params = new HttpParams()
    .set('pagina', pagina)
    .set('quantidade', quantidade)

    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    return this.http.get(`${this.url}/listar_clientes_cadastrados`, {params, headers})
  }

  getContarClientesCadastrados() {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`) 

    return this.http.get(`${this.url}/contar_clientes_cadastrados`, {headers})
  }

  getListarDevicesPorEmpresa(prefixo: string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('prefixo', prefixo)

    return this.http.get(`${this.url}/listar_devices_por_empresa`, {headers, params})
  }

  getPesquisarClientes(pesquisa:string, pagina:number, quantidade:number) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('pesquisa', pesquisa)
    .set('pagina', pagina)
    .set('quantidade', quantidade)

    return this.http.get(`${this.url}/pesquisar_clientes`, {headers, params})
  }

  getContarClientesPesquisados(pesquisa:string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('pesquisa', pesquisa)

    return this.http.get(`${this.url}/contar_clientes_pesquisados`, {headers, params})
  }

  getListarMensagensEnviadas(prefixo:string, pagina:number, quantidade:number) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('prefixo', prefixo)
    .set('pagina', pagina)
    .set('quantidade', quantidade)

    return this.http.get(`${this.url}/listar_mensagens_enviadas`, {headers, params})
  }

  getContarMensagensEnviadas(prefixo:string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('prefixo', prefixo)

    return this.http.get(`${this.url}/contar_mensagens_enviadas`, {headers, params})
  }

  postEnviarNotificacoesPush(prefixo:string, usernames:any, mensagem:string) {
    let headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.token}`)

    let params = new HttpParams()
    .set('prefixo', prefixo)
    .set('mensagem', mensagem)

    

    return this.http.post(`${this.url}/enviar_notificacoes_push`, usernames, {headers, params})
  }
}
