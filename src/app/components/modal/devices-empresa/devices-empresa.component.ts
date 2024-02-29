import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../../core/clientes.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-devices-empresa',
  templateUrl: './devices-empresa.component.html',
  styleUrl: './devices-empresa.component.scss'
})
export class DevicesEmpresaComponent implements OnInit {

  constructor(private api: ClientesService, private message: MessageService, private confirmationService: ConfirmationService,
    private dialogConfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef) { }

  empresas: any = {}
  empresasSelecionadas: any = {}
  valueTxtArea: any = ''
  caracteresFaltantes: any = 300
  prefixos: any = this.dialogConfig.data.prefixos
  tipo: any = this.dialogConfig.data.tipo
  enviando=false;

  ngOnInit(): void {
    this.devicesEmpresa();

  }


  limiteCaracteres() {
    this.caracteresFaltantes = 300 - this.valueTxtArea.length;
  }

  devicesEmpresa() {
    if (this.prefixos.length > 0) {
      this.prefixos.forEach((prefixo: any) => {
        this.api.getListarDevicesPorEmpresa(prefixo).subscribe((response: any) => {

          this.empresas[prefixo] = response.devices;
          if (response.devices.length > 0) {
            this.empresasSelecionadas[prefixo] = response.devices;
          }
        })
      })
    }

  }

  enviarMensagem() {

    let keys = Object.keys(this.empresasSelecionadas);
    let count = 0;

    keys.forEach((key: any) => {
      if (this.empresasSelecionadas[key].length > 0) {
        count++;
      }
    })

    if (count == 0) {
      this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione ao menos uma empresa' });
      return;
    }

    if (this.valueTxtArea === '' || this.valueTxtArea.length > 300) {
      this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha a mensagem com no máximo 300 caracteres' });
      return;
    }

    this.enviando=true;

    keys.forEach((key: any) => {
      if (this.empresasSelecionadas[key].length > 0) {
        let usernames: any = {}
        usernames['usernames'] = this.empresasSelecionadas[key].map((device: any) => { return device.username })
        this.enviarNotificacaoPush(key, usernames)
      }
    })

    this.enviando=false;
    this.fechar();
  }

  enviarNotificacaoPush(prefixo: any, usernames: any) {
    this.api.postEnviarNotificacoesPush(prefixo, usernames, this.valueTxtArea).subscribe((res: any) => {
     

      this.message.add({ severity: 'success', summary: 'Sucesso', detail: `Mensagem enviada com sucesso para prefixo: ${prefixo}` });
      
    }, (error) => {
      this.message.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
    })
  }

  confirm(e: Event, device: any) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Deseja realmente excluir este dispositivo?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteDevice(device)
      },
      reject: () => {
      }
    })
  }

  deleteDevice(device: any) {
    this.api.deleteRemoverDevice(device.username).subscribe((res: any) => {
      this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Dispositivo removido com sucesso' });
      this.devicesEmpresa();
    }, (error) => {

      this.message.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
    })
  }

  enviarNotificacaoGeral() {
    if (this.valueTxtArea === '' || this.valueTxtArea.length > 300) {
      this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Preencha a mensagem com no máximo 300 caracteres' });
      return;
    }

    this.enviando = true;

    this.api.postEnviarNotificacoesPushGlobal(this.valueTxtArea).subscribe((res: any) => {
      
      this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem enviada com sucesso' });
      this.enviando = false;
      this.fechar();
    }, (error) => {

      this.enviando = false;
      this.message.add({ severity: 'error', summary: 'Erro', detail: error.error.message });
    })
  }

  fechar() {
    this.dialogRef.close();
  }
}
