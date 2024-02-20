import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { AdicionarUsuarioComponent } from '../modal/adicionar-usuario/adicionar-usuario.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit{

  constructor(private api: AuthenticationService, private confirmationService: ConfirmationService, public message: MessageService, public dialog: DialogService) {}

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

  deleteUser(user: any) {
    this.api.deleteUser(user.email).subscribe((res:any) => {
      this.message.add({severity:'success', summary:'Usuário excluído com sucesso', detail:''});
      this.getUsers()
    })
  }

  abrirModal(editar=false, user={}) {
    let dialog = this.dialog.open(AdicionarUsuarioComponent, {
      modal: true,
      header: 'Adicionar usuário',
      width: '35%',
      data: {
        user: user,
        alterar: editar
      }
    })

    dialog.onClose.subscribe((res:any) => {
      this.getUsers()

    })
  }

  confirm(e: Event, user:any) {
    this.confirmationService.confirm({
      target: e.target as EventTarget,
      message: 'Deseja realmente excluir este usuário?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.deleteUser(user)
      },
      reject: () => {
      }
    })
  }
}
