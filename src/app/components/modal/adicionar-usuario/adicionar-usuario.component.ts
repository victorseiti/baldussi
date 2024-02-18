import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-adicionar-usuario',
  templateUrl: './adicionar-usuario.component.html',
  styleUrl: './adicionar-usuario.component.scss'
})
export class AdicionarUsuarioComponent {
  @Input() mostrar: boolean = false;
  @Input() user: any = {}
  @Output() fecharModal = new EventEmitter();

  constructor() { }

  usuario:any={}

  fechar() {
    this.mostrar = false;
    this.fecharModal.emit(false);
  }

  salvarUsuario() {
    console.log('user: ', this.usuario)
  }
}
