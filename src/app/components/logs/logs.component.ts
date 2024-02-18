import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../core/logs.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})
export class LogsComponent implements OnInit{

  constructor(private api: LogsService, public message: MessageService) { }

  tipoLogs: any = []
  logs: any = []
  logSelecionado: any = ''
  pagina = 1
  quantidadePagina = 20
  quantidadeRegistros = 0
  carregandoDados = false
  first = 0

  ngOnInit() {
    this.tiposLogs();
  }

  tiposLogs() {
    this.api.getListarTiposDeLogs().subscribe((response: any) => {
      console.log('Response:', response);
      this.tipoLogs = response.tipos
    })
  }

  listarLogs() {
    this.carregandoDados = true;
    this.api.getListarLogs(this.logSelecionado, this.pagina, this.quantidadePagina).subscribe((response: any) => {
      console.log('Response:', response);
      if (response.logs.length > 0) {
        this.logs = response.logs;  
      }
      else {
        this.message.add({severity:'error', summary:'Nenhum log encontrado', detail:''});
      }
      this.carregandoDados = false;
    })
  }

  contarLogs() {
    this.api.getContarLogs(this.logSelecionado).subscribe((response: any) => {
      console.log('Response:', response);
      this.quantidadeRegistros = response.count;
    })
  }

  modelChange(event: any) {
    console.log('Event:', event);
    this.logSelecionado = event;
    this.contarLogs();
    this.listarLogs();
  }

  onPageChange(event: any) {
    console.log('Event:', event);
    this.pagina = event.page + 1;
    this.quantidadePagina = event.rows;
    this.first = event.first;
    this.listarLogs();
  }
}
