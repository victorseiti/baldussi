import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/authentication.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class ClientesComponent implements OnInit{
  
  constructor(private api: AuthenticationService) {}
  
  clientes: any = []
  visible=false
  user:any=''

  ngOnInit() {
   this.getUsers()
  }

  getUsers() {
    this.api.getListUsers().subscribe((res:any) => {
      this.clientes = res.users
    })
  }

  editUser(user: any) {
    console.log('user: ', user)
  }

  deleteUser(user: any) {
    console.log('user: ', user)
  }

  abrirModal() {
    this.visible = true
  }

  fecharModal(e:any) {
    console.log('fecharModal: ', e)
    this.visible = e
  }
}
