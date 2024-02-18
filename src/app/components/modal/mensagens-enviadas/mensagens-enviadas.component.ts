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
@Output() fecharModal = new EventEmitter();

  constructor(private api: ClientesService, public message: MessageService) { }

  pagina=1
  quantidadePagina=20
  mensagens: any = []

  ngOnChanges() {
    if (this.mostrar) {
      console.log('Prefixo:', this.prefixo);
      this.listarMensagens();
    }
  }

  listarMensagens() {
    this.api.getListarMensagensEnviadas(this.prefixo, this.pagina, this.quantidadePagina).subscribe((response: any) => {
      console.log('Response:', response);
      if (response.envios.length > 0) {
        
        this.mensagens = response.envios;
      }
      else {
        this.message.add({severity:'error', summary:'Nenhuma mensagem encontrada', detail:''});
        this.fechar();
      }
    })
  }

  fechar() {
    this.prefixo = '';
    this.mensagens = [];
    this.mostrar = false;
    this.fecharModal.emit(false);
  }
}
