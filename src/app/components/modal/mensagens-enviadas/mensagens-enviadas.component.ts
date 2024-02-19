import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { ClientesService } from '../../../core/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-mensagens-enviadas',
  templateUrl: './mensagens-enviadas.component.html',
  styleUrl: './mensagens-enviadas.component.scss'
})
export class MensagensEnviadasComponent implements OnChanges{
@Input() mostrar: boolean = false;
@Input() prefixo: any;
@Input() quantidadeRegistros: any;
@Output() fecharModal = new EventEmitter();

  constructor(private api: ClientesService, public message: MessageService) { }

  pagina=1
  quantidadePagina=20
  mensagens: any = []
  carregandoDados=false
  first = 0

  ngOnChanges() {
    if (this.mostrar) {
      console.log('Prefixo:', this.prefixo);
      this.listarMensagens();
    }
  }

  listarMensagens() {
    this.carregandoDados = true;
    this.api.getListarMensagensEnviadas(this.prefixo, this.pagina, this.quantidadePagina).subscribe((response: any) => {
      console.log('Response:', response);
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
    this.quantidadeRegistros = 0;
    this.prefixo = '';
    this.mensagens = [];
    this.mostrar = false;
    this.fecharModal.emit(false);
  }
}
