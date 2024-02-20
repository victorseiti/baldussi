import { Component, Input, OnInit } from '@angular/core';
import { ClientesService } from '../../../core/clientes.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-mensagens-enviadas',
  templateUrl: './mensagens-enviadas.component.html',
  styleUrl: './mensagens-enviadas.component.scss'
})
export class MensagensEnviadasComponent implements OnInit {

  constructor(private api: ClientesService, public message: MessageService, private dialogRef: DynamicDialogRef, private dialogConfig: DynamicDialogConfig) { }

  pagina = 1
  quantidadePagina = 20
  mensagens: any = []
  carregandoDados = false
  first = 0
  prefixo: any = this.dialogConfig.data.prefixo
  quantidadeRegistros: any = this.dialogConfig.data.quantidadeReg

  ngOnInit() {
    this.listarMensagens();

  }

  listarMensagens() {
    this.carregandoDados = true;
    this.api.getListarMensagensEnviadas(this.prefixo, this.pagina, this.quantidadePagina).subscribe((response: any) => {
      
      this.mensagens = response.envios;
      this.carregandoDados = false;
    })
  }

  onPageChange(event: any) {
    this.pagina = event.page + 1;
    this.quantidadePagina = event.rows;
    this.first = event.first;
    this.listarMensagens();
  }

  fechar() {
    this.dialogRef.close();
  }
}
