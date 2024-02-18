import { Component } from '@angular/core';
import { ClientesService } from '../../core/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private api: ClientesService, private message: MessageService) { }

  clientes!: any[];

  clientesSelecionados: any=[];
  quantidadeRegistros!: number;
  carregandoDados=false
  visible=false
  prefixos: any = []

  pagina=1
  quantidadePagina=20

  ngOnInit() {
    this.getClientes();
    this.getQuantidadeClientes();
  }

  getClientes() {
    this.carregandoDados = true;
    this.api.getListarClientesCadastrados(this.pagina, this.quantidadePagina).subscribe((response: any) => {
      console.log('Response:', response);
      this.clientes = response.clientes;
      console.log('Clientes:', this.clientes);
      this.carregandoDados = false;
    })
  }

  getQuantidadeClientes() {
    this.api.getContarClientesCadastrados().subscribe((response: any) => {
      console.log('quantidade:', response);
      this.quantidadeRegistros = response.count;
    })
  }

  onPageChange(event: any) {
    console.log('Event:', event);
    this.pagina = event.page + 1;
    this.getClientes();
  }

  abrirModalDevices() {
    if (this.clientesSelecionados.length > 0) {
      this.prefixos = this.clientesSelecionados.map((cliente: any) => cliente.prefixo);
    this.visible = true;
    }
    else {
      this.message.add({severity:'warn', summary:'Atenção', detail:'Selecione ao menos um cliente para enviar a mensagem'});
    }
  }

  fecharModal(event: any) {
    this.visible = event;
  }
}
