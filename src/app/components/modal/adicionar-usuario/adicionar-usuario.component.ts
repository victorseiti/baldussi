import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../core/authentication.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrl: './adicionar-usuario.component.scss'
})
export class AdicionarUsuarioComponent implements OnInit {
 
  constructor(private api: AuthenticationService, public message: MessageService, public dialogConfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef) { }

  usuario:any={}
  permissoes: any = ['admin', 'comum']
  alterar = this.dialogConfig.data.alterar

  ngOnInit() {
    if(this.alterar) {
      this.usuario = this.dialogConfig.data.user
    } else {
      this.usuario = {}
    }
  }

  fechar() {
    this.dialogRef.close()
  }

  salvarUsuario() {
    this.api.postRegisterUser(this.usuario).subscribe((res:any) => {
      this.fechar()
      this.message.add({severity:'success', summary:'Usuário cadastrado com sucesso', detail:''});
    })
  }

  alterarUsuario() {
    this.api.putUpdateUser(this.usuario).subscribe((res:any) => {
      
      this.fechar()
      this.message.add({severity:'success', summary:'Usuário alterado com sucesso', detail:''});
    })
  }
}
