import { Cliente } from '../cadastro/cliente';
import { ClienteService } from '../cliente.service';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule
  ],
  templateUrl: './consulta.html',
  styleUrl: './consulta.scss'
})
export class Consulta implements OnInit {

  nomeBuscado: string = '';
  colunasTabela: string[] = ['nome', 'email', 'cpf', 'dataNascimento', 'localizacao', 'acoes']; // Colunas da tabela de clientes
  listaClintes: Cliente[] = []; // Lista de clientes que será exibida na tabela
  snackbar: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService, 
    private router: Router
  ) { }  
  
  // Carrega a lista de clientes ao iniciar o componente
  public ngOnInit() {
    this.listaClintes = this.service.pesquisarClientes(''); // Inicia pesquisando por todos os clientes
  }

  public pesquisarClientes() {
    this.listaClintes = this.service.pesquisarClientes(this.nomeBuscado); // Filtra os clientes e exibe apenas aqueles que corresponderem ao nome buscado
  }

  public preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } }); // Redireciona para a página de cadastro com o ID do cliente a ser editado
  }

  public preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  public deletarCliente(cliente: Cliente) {
    this.service.deletarCliente(cliente);
    this.listaClintes = this.service.pesquisarClientes(''); // Atualiza a lista
    this.snackbar.open('Cliente deletado com sucesso!', 'Ok', { duration: 5000 });
  }

}
