import { Component, OnInit } from '@angular/core';
import { LogsService } from '../../core/logs.service';
import { ClientesService } from '../../core/clientes.service';
import { format, subDays } from 'date-fns'
import { range } from 'rxjs';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.scss'
})
export class MensagensComponent implements OnInit {

  constructor(private api: LogsService, private apiCliente: ClientesService) { }

  logs: any = []
  carregandoDados = false
  pagina = 1
  quantidadePagina = 20
  totalRegistros = 0
  first = 0
  prefixos: any = []
  prefixoSelecionado = ''

  qntdMensagem = 0

  dataInicio = format(subDays(new Date(), 30), 'yyyy-MM-dd HH:mm:ss')
  dataFim = format(new Date(), 'yyyy-MM-dd HH:mm:ss')
  somenteContar = false

  rangeDates: any = [
    subDays(new Date(), 30), new Date()
  ]

  ngOnInit(): void {
    this.obterNotificacoes()
    this.obterContagemNotificacoes()
    this.getPrefixos()
  }

  getPrefixos() {
    this.apiCliente.getListarClientesCadastrados(1, 99999).subscribe((res: any) => {
      this.prefixos = res.clientes.map((cliente: any) => { return cliente.prefixo })
      console.log(this.prefixos)
    })
  }

  filtroPrefixo() {
    if (this.prefixoSelecionado) {
      this.obterNotificacoes()
      this.obterContagemNotificacoes()
    }
  }

  filtroData() {
    if (this.rangeDates) {

      if (this.rangeDates[0]) {
        this.dataInicio = format(this.rangeDates[0], 'yyyy-MM-dd HH:mm:ss')
      }

      if (this.rangeDates[1]) {
        this.dataFim = format(this.rangeDates[1], 'yyyy-MM-dd HH:mm:ss')
      }

      if (this.rangeDates[0] && this.rangeDates[1]) {
        console.log('range de datas')
        this.obterNotificacoes()
        this.obterContagemNotificacoes()
      }
    }
  }

  limparDatas() {
    this.rangeDates = null
    this.dataInicio = ''
    this.dataFim = ''
    this.obterNotificacoes()
    this.obterContagemNotificacoes()
  }

  obterNotificacoes() {
    this.carregandoDados = true
    this.api.getObterNotificacoes(this.prefixoSelecionado, this.dataInicio, this.dataFim, this.pagina, this.quantidadePagina, this.somenteContar).subscribe((res: any) => {
      console.log(res)
      this.logs = res.logs
      this.carregandoDados = false
    })
  }

  obterContagemNotificacoes() {
    this.api.getObterNotificacoes(this.prefixoSelecionado, this.dataInicio, this.dataFim, this.pagina, this.quantidadePagina, true).subscribe((res: any) => {
      console.log(res)
      this.totalRegistros = res.count

    })

  }

  limpaFiltroPrefixo() {
    this.prefixoSelecionado = ''
    this.obterNotificacoes()
    this.obterContagemNotificacoes()
  }

  onPageChange(event: any) {
    this.pagina = event.page + 1
    this.quantidadePagina = event.rows
    this.first = event.first
    this.obterNotificacoes()
  }
}
