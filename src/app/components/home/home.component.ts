import { Component } from '@angular/core';
import { ClientesService } from '../../core/clientes.service';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { DevicesEmpresaComponent } from '../modal/devices-empresa/devices-empresa.component';
import { MensagensEnviadasComponent } from '../modal/mensagens-enviadas/mensagens-enviadas.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private api: ClientesService, private message: MessageService, public dialog: DialogService) { }

  clientes!: any[];

  clientesSelecionados: any = [];
  quantidadeRegistros!: number;
  carregandoDados = false
  visible = false
  prefixos: any = []
  filtro: any = ''

  pagina = 1
  quantidadePagina = 20
  first = 0

  ngOnInit() {
    this.getClientes();
    this.getQuantidadeClientes();
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        let btn = document.getElementById('btnPesquisar') as HTMLElement;
        btn.click();
      }
    })
  }

  getClientes(pesquisa: boolean = false) {
    this.carregandoDados = true;
    if (pesquisa) {
      this.getQuantidadeClientes();
    }
    this.api.getListarClientesCadastrados(this.pagina, this.quantidadePagina).subscribe((response: any) => {
      
      this.clientes = response.clientes;
      this.carregandoDados = false;
    })
  }

  getQuantidadeClientes() {
    this.api.getContarClientesCadastrados().subscribe((response: any) => {
      this.quantidadeRegistros = response.count;
    })
  }

  onPageChange(event: any) {
    this.pagina = event.page + 1;
    this.quantidadePagina = event.rows;
    this.first = event.first;
    this.getClientes();
  }

  abrirModalDevices(tipo: string) {

    if (tipo == 'selecao') {

      if (this.clientesSelecionados.length > 0) {
        this.dialog.open(DevicesEmpresaComponent, {
          header: "Enviar notificação",
          modal: true,
          draggable: false,
          resizable: false,
          width: '70vw',
          data: {
            prefixos: this.clientesSelecionados.map((cliente: any) => cliente.prefixo),
            tipo: tipo
          }
        })
      }
      else {
        this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione ao menos um cliente para enviar a mensagem' });
      }
    }
    else {
      this.dialog.open(DevicesEmpresaComponent, {
        header: "Enviar notificação",
        modal: true,
        draggable: false,
        resizable: false,
        width: '70vw',
        data: {
          prefixos: [],
          tipo: tipo
        }
      })
    }
  }


  getQuantidadeClientesPesquisa() {
    this.api.getContarClientesPesquisados(this.filtro).subscribe((response: any) => {
      this.quantidadeRegistros = response.count;
    })
  }

  buscarClientes() {
    this.carregandoDados = true;
    this.getQuantidadeClientesPesquisa();
    this.api.getPesquisarClientes(this.filtro, 1, 9999).subscribe((response: any) => {
      if (response.clientes.length > 0) {
        this.clientes = response.clientes;
      }
      else {
        this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Nenhum cliente encontrado' });
      }
      this.carregandoDados = false;
    })
  }

  inputPesquisar() {
    if (this.filtro === '') {
      this.getClientes(true);
    }
  }

  prefixoMensagemEnviadas: any = ''
  visibleMensagemEnviada = false
  quantidadeMensaensEnviadas = 0

  modalMensagemEnviada(cliente: any) {
    this.api.getContarMensagensEnviadas(cliente.prefixo).subscribe((response: any) => {
      if (response.count > 0) {
        this.prefixoMensagemEnviadas = cliente.prefixo;
        this.quantidadeMensaensEnviadas = response.count;

        this.dialog.open(MensagensEnviadasComponent, {
          header: "Mensagens enviadas",
          modal: true,
          draggable: false,
          resizable: false,
          width: '80vw',
          data: {
            prefixo: cliente.prefixo,
            quantidadeReg: response.count
          }

        })
      }
      else {
        this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Nenhuma mensagem enviada para este cliente' });
      }
    })
  }

}
