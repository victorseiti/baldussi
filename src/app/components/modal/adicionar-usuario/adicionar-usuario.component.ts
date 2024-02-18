import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrl: './adicionar-usuario.component.scss'
})
export class AdicionarUsuarioComponent implements OnChanges {
  @Input() mostrar: boolean = false;
  @Input() alterar: boolean = false;
  @Input() user: any = {}
  @Output() fecharModal = new EventEmitter();

  constructor(private api: AuthenticationService, public message: MessageService) { }

  usuario:any={}

  ngOnChanges() {
    if(this.alterar) {
      this.usuario = this.user
    } else {
      this.usuario = {}
    }
  }

  fechar() {
    this.mostrar = false;
    this.alterar = false;
    this.fecharModal.emit(false);
  }

  salvarUsuario() {
    console.log('user: ', this.usuario)
    this.api.postRegisterUser(this.usuario).subscribe((res:any) => {
      console.log('res: ', res)
      this.fechar()
      this.message.add({severity:'success', summary:'Usuário cadastrado com sucesso', detail:''});
    })
  }

  alterarUsuario() {
    console.log('user: ', this.usuario)
    this.api.putUpdateUser(this.usuario).subscribe((res:any) => {
      console.log('res: ', res)
      this.fechar()
      this.message.add({severity:'success', summary:'Usuário alterado com sucesso', detail:''});
    })
  }
}
