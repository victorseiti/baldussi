import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../core/logs.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss'
})
export class MensagensComponent implements OnInit {

  constructor(private api: LogsService) { }

  logs: any = []
  carregandoDados = false
  pagina=1
  quantidadePagina=20
  totalRegistros=0
  first=0

  ngOnInit(): void {
    this.getContarMensagens()
    this.getMensagens()
  }

  getMensagens() {
    this.carregandoDados = true
    this.api.getListarLogs('enviar_notificacoes_push', this.pagina, this.quantidadePagina).subscribe((res: any) => {
      this.logs = res.logs
      this.carregandoDados = false
    })
  }

  getContarMensagens() {
    this.api.getContarLogs('enviar_notificacoes_push').subscribe((res: any) => {
      this.totalRegistros = res.count
    })
  }

  onPageChange(event: any) {
    this.pagina = event.page + 1
    this.quantidadePagina = event.rows
    this.first = event.first
    this.getMensagens()
  }
}
