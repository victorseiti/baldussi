import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{
  
  constructor(private api: AuthenticationService, private confirmationService: ConfirmationService, public message: MessageService) {}
  
  usuarios: any = []
  visible=false
  alterarCliente=false
  user:any=''
  carregandoDados=false

  ngOnInit() {
   this.getUsers()
  }

  getUsers() {
    this.carregandoDados = true
    this.api.getListUsers().subscribe((res:any) => {
      this.usuarios = res.users
      this.carregandoDados = false
    })
  }

  editUser(user: any) {
    console.log('user: ', user)
    this.user = user
    this.visible = true
    this.alterarCliente = true
  }

  deleteUser(user: any) {
    this.api.deleteUser(user).subscribe((res:any) => {
      console.log('res: ', res)
      this.message.add({severity:'success', summary:'Usuário excluído com sucesso', detail:''});
      this.getUsers()
    })
  }

  abrirModal() {
    this.visible = true
  }

  fecharModal(e:any) {
    console.log('fecharModal: ', e)
    this.visible = e
    this.alterarCliente = e
    this.getUsers()
  }

  confirm(e: Event) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Deseja realmente excluir este usuário?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteUser(e)
      },
      reject: () => {
        console.log('cancelou')
      }
    })
  }
}
