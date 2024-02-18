import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ClientesService } from '../../../core/clientes.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-devices-empresa',
  templateUrl: './devices-empresa.component.html',
  styleUrl: './devices-empresa.component.scss'
})
export class DevicesEmpresaComponent implements OnChanges {
  @Input() mostrar: boolean = false;
  @Input() prefixos: any = [];
  @Output() fecharModal = new EventEmitter();

  constructor(private api: ClientesService, private message: MessageService) { }

  empresas: any = {}
  empresasSelecionadas: any = {}
  valueTxtArea: any

  ngOnChanges(): void {
    if (this.mostrar) {
      this.devicesEmpresa();
    }
  }

  devicesEmpresa() {
    if (this.prefixos.length > 0) {
      this.prefixos.forEach((prefixo: any) => {
        this.api.getListarDevicesPorEmpresa(prefixo).subscribe((response: any) => {

          this.empresas[prefixo] = response.devices;
        })
      })
    }

  }

  enviarMensagem() {
    console.log('Empresas selecionadas:', this.empresasSelecionadas);
    console.log('Mensagem:', this.valueTxtArea);

    let keys = Object.keys(this.empresasSelecionadas);
    let count = 0;

    keys.forEach((key: any) => {
      if (this.empresasSelecionadas[key].length > 0) {
        count++;
      }
    })

    if (this.valueTxtArea !== '' && count > 0) {
      this.message.add({ severity: 'success', summary: 'Sucesso', detail: 'Mensagem enviada com sucesso' });
      keys.forEach((key: any) => {
        if (this.empresasSelecionadas[key].length > 0) {
          let usernames:any={}
          usernames['usernames'] = this.empresasSelecionadas[key].map((device: any) => {return device.username})
          this.enviarNotificacaoPush(key, usernames)
        }
      })
    }
    else {
      this.message.add({ severity: 'warn', summary: 'Atenção', detail: 'Selecione ao menos uma empresa e preencha a mensagem' });
    }
  }

  enviarNotificacaoPush(prefixo:any, usernames:any) {
    console.log('prefixo: ', prefixo)
    console.log('usernames: ', usernames)
    this.api.postEnviarNotificacoesPush(prefixo, usernames, this.valueTxtArea).subscribe((res:any) => {
      console.log('res: ', res)
    })
  }

  fechar() {
    this.valueTxtArea = '';
    this.empresasSelecionadas = {};
    this.mostrar = false;
    this.fecharModal.emit(false);
  }
}
