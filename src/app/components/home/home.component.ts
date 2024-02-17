import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  clientes!: any[];

  clientesSelecionados!: any;

  constructor(private api: ApiService) {}

  ngOnInit() {
     this.getClientes();
  }

  getClientes() {
    this.api.getListarClientesCadastrados(1,20).subscribe((response:any) => {
      console.log('Response:', response);
      this.clientes = response.clientes;
      console.log('Clientes:', this.clientes);
    })
  }
}
