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
  filtro: any = ''

  pagina=1
  quantidadePagina=20
  first = 0

  ngOnInit() {
    this.getClientes();
    this.getQuantidadeClientes();
  }

  getClientes(pesquisa:boolean=false) {
    this.carregandoDados = true;
    if (pesquisa) {
      this.getQuantidadeClientes();
    }
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
    this.quantidadePagina = event.rows;
    this.first = event.first;
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

  getQuantidadeClientesPesquisa() {
    this.api.getContarClientesPesquisados(this.filtro).subscribe((response: any) => {
      console.log('quantidade:', response);
      this.quantidadeRegistros = response.count;
    })
  }

  buscarClientes() {
    console.log('filtro:', this.filtro);
    this.carregandoDados = true;
    this.getQuantidadeClientesPesquisa();
    this.api.getPesquisarClientes(this.filtro, 1, 9999).subscribe((response: any) => {
      console.log('Response:', response);
      if (response.clientes.length > 0) {
        this.clientes = response.clientes;
      }
      else {
        this.message.add({severity:'warn', summary:'Atenção', detail:'Nenhum cliente encontrado'});
      }
      this.carregandoDados = false;
    })
  }

  inputPesquisar() {
    if (this.filtro === '') {
      this.getClientes(true);
    }
  }

  fecharModal(event: any) {
    this.visible = event;
  }

  prefixoMensagemEnviadas: any = ''
  visibleMensagemEnviada=false

  modalMensagemEnviada(cliente:any) {
    this.prefixoMensagemEnviadas = cliente.prefixo;
    this.visibleMensagemEnviada = true;
  }

  fecharModalMensagemEnviada(event: any) {
    this.visibleMensagemEnviada = event;
  }
}
