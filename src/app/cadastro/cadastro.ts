import { ActivatedRoute, Router } from '@angular/router';
import { BrasilapiService } from '../brasilapi.service';
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Estado, Municipio } from '../brasilapi.models';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-cadastro',
  imports: [
    CommonModule,
    FlexLayoutModule, 
    FormsModule, 
    MatButtonModule,
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.scss'
})
export class Cadastro implements OnInit {
  cliente: Cliente = Cliente.newCliente();
  atualizandoCliente: boolean = false;
  snackbar: MatSnackBar = inject(MatSnackBar);
  estados: Estado[] = [];
  municipios: Municipio[] = [];
  
  constructor(
    private service: ClienteService,
    private brasilApiService: BrasilapiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  
  public ngOnInit(): void {
    this.route.queryParams.subscribe((query: any) => {
      const params = query['params']; // Obtém os parâmetros da rota
      const id = params['id']; // Obtém o ID do cliente a partir dos parâmetros da rota
      if (id) {
        // Busca o cliente pelo ID ou cria um novo cliente se não encontrado
        let clienteEncontrado = this.service.buscarClientePorId(id);
        if (clienteEncontrado) {
          this.atualizandoCliente = true;
          this.cliente = clienteEncontrado; 
          if (this.cliente.uf) {
            const event = { value: this.cliente.uf }
            this.carregarMunicipios(event as MatSelectChange);
          }
        }
      }});
      
      this.carregarUfs();
    }
    
    carregarUfs() {
      this.brasilApiService.listarUfs().subscribe({
        next: listaEstados => {
          this.estados = listaEstados.sort((a, b) => a.sigla.localeCompare(b.sigla));
        },
        error: erro => console.log("Ocorreu um erro ao carregar UFs: ", erro)
      });
    }
    
    carregarMunicipios(event: MatSelectChange) {
      const ufSelecionada = event.value;
      this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
        next: listaMunicipios => {
          this.municipios = listaMunicipios.sort((a, b) => a.nome.localeCompare(b.nome));
        },
        error: erro => console.log("Ocorreu um erro ao carregar municípios: ", erro)
      });
    }
    
    private exibirMensagem(mensagem: string) {
      this.snackbar.open(mensagem, 'Ok', { duration: 5000 });
    }
    
    private validarDataNascimento(date: any): boolean {
      if (!(date instanceof Date)) {
        const parsedDate = new Date(date);
        return !isNaN(parsedDate.getTime());
      } 
      return !isNaN(date.getTime());
    }
    
    private validarCliente(): boolean {
      return (
        this.cliente.nome?.trim() !== '' &&
        this.cliente.email?.trim() !== '' &&
        this.cliente.cpf?.trim() !== '' &&
        this.validarDataNascimento(this.cliente.dataNascimento) &&
        this.cliente.uf !== '' &&
        this.cliente.municipio !== ''
      );
    }
    
    // Chama a função de salvarCliente do ClienteService
    public salvarCliente() {
      if (!this.validarCliente()) {
        this.exibirMensagem('Por favor, preencha todos os campos corretamente.');
        return;
      }
      
      if (!this.atualizandoCliente) {
        this.service.salvarCliente(this.cliente);
        this.exibirMensagem('Cliente salvo com sucesso!');
        this.router.navigate(['/consulta']);
      } else {
        this.service.atualizarCliente(this.cliente);
        this.exibirMensagem('Cliente atualizado com sucesso!');
        this.router.navigate(['/consulta'])
      }
    }
  }
  