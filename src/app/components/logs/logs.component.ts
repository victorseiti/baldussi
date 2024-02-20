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
  
  logs: any = []
  logSelecionado: any = ''
  pagina = 1
  quantidadePagina = 20
  quantidadeRegistros = 0
  carregandoDados = false
  first = 0

  friendly_labels = {
    'action': 'Ação',
    'timestamp': 'Data',
    'user_email': 'E-mail do Usuário',
    'prefixo': 'Prefixo',
    'mensagem': 'Mensagem',
    'usernames': 'Nomes de Usuários',
    'pesquisa': 'Pesquisa',
    'deleted_user': 'Usuário Excluído',
    'new_user': 'Novo Usuário',
    'updated_user': 'Usuário Atualizado'
}

  keysEnviarNotificacoesPush: any = {'value': ['action', 'timestamp', 'user_email', 'prefixo', 'mensagem', 'usernames'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Prefixo', 'Mensagem', 'Nomes de Usuários']}
  keysPesquisar = {'value': ['action', 'timestamp', 'user_email', 'pesquisa'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Pesquisa']}
  keysApagar = {'value': ['action', 'timestamp', 'user_email', 'deleted_user'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Usuário Excluído']}
  keysListarMensagensEnviadas = {'value': ['action', 'timestamp', 'user_email', 'prefixo'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Prefixo']}
  keysContarClientesPesquisados = {'value': ['action', 'timestamp', 'user_email', 'pesquisa'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Pesquisa']}
  keysContarMensagensEnviadas = {'value': ['action', 'timestamp', 'user_email', 'prefixo'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Prefixo']}
  keysListarDevicesPorEmpresa = {'value': ['action', 'timestamp', 'user_email'], 'label': ['Ação', 'Data', 'E-mail do Usuário']}
  keysContarClientesCadastrados = {'value': ['action', 'timestamp', 'user_email'], 'label': ['Ação', 'Data', 'E-mail do Usuário']}
  keysRegister = {'value': ['action', 'timestamp', 'user_email', 'new_user'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Novo Usuário']}
  keysListarClientesCadastrados = {'value': ['action', 'timestamp', 'user_email'], 'label': ['Ação', 'Data', 'E-mail do Usuário']}
  keysUpdate = {'value': ['action', 'timestamp', 'user_email', 'updated_user'], 'label': ['Ação', 'Data', 'E-mail do Usuário', 'Usuário Atualizado']}

  tipoLogs: any = [
    { "label": "Enviar Notificações Push", "value": "enviar_notificacoes_push", "keys": this.keysEnviarNotificacoesPush.value, "labelKey": this.keysEnviarNotificacoesPush.label },
    { "label": "Pesquisar Clientes", "value": "pesquisar_clientes", "keys": this.keysPesquisar.value, "labelKey": this.keysPesquisar.label},
    { "label": "Apagar Usuário", "value": "delete_user", "keys": this.keysApagar.value, "labelKey": this.keysApagar.label},
    { "label": "Listar Mensagens Enviadas", "value": "listar_mensagens_enviadas", "keys": this.keysListarMensagensEnviadas.value, "labelKey": this.keysListarMensagensEnviadas.label},
    { "label": "Contar Clientes Pesquisados", "value": "contar_clientes_pesquisados", "keys": this.keysContarClientesPesquisados.value, "labelKey": this.keysContarClientesPesquisados.label},
    { "label": "Contar Mensagens Enviadas", "value": "contar_mensagens_enviadas", "keys": this.keysContarMensagensEnviadas.value, "labelKey": this.keysContarMensagensEnviadas.label},
    { "label": "Listar Dispositivos por Empresa", "value": "listar_devices_por_empresa", "keys": this.keysListarDevicesPorEmpresa.value, "labelKey": this.keysListarDevicesPorEmpresa.label},
    { "label": "Contar Clientes Cadastrados", "value": "contar_clientes_cadastrados", "keys": this.keysContarClientesCadastrados.value, "labelKey": this.keysContarClientesCadastrados.label},
    { "label": "Registrar Usuário", "value": "register_user", "keys": this.keysRegister.value, "labelKey": this.keysRegister.label},
    { "label": "Listar Clientes Cadastrados", "value": "listar_clientes_cadastrados", "keys": this.keysListarClientesCadastrados.value, "labelKey": this.keysListarClientesCadastrados.label},
    { "label": "Atualizar Usuário", "value": "update_user", "keys": this.keysUpdate.value, "labelKey": this.keysUpdate.label}
  ]

  ngOnInit() {
  }

  tiposLogs() {
    this.api.getListarTiposDeLogs().subscribe((response: any) => {
      this.tipoLogs = response.tipos
      // traduza os itens do array para um nome mais amigável

    })
  }

  listarLogs() {
    this.carregandoDados = true;
    this.api.getListarLogs(this.logSelecionado.value, this.pagina, this.quantidadePagina).subscribe((response: any) => {
      
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
    this.api.getContarLogs(this.logSelecionado.value).subscribe((response: any) => {
      
      this.quantidadeRegistros = response.count;
    })
  }

  modelChange(event: any) {
    this.logSelecionado = event;
    this.contarLogs();
    this.listarLogs();
  }

  onPageChange(event: any) {
    this.pagina = event.page + 1;
    this.quantidadePagina = event.rows;
    this.first = event.first;
    this.listarLogs();
  }
}
