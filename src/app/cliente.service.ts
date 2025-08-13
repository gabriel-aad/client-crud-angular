import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static REPO_CLIENTES = '_CLIENTES'; // Chave para o repositorioClientes no localStorage
  
  constructor() { }
  
  private obterStorage(): Cliente[] {
    const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    // Se o repositório já existir
    if (repositorioClientes){
      const clientes: Cliente[] = JSON.parse(repositorioClientes);
      return clientes;
    }
    // Se o repositório não existir, cria um novo array de clientes
    const clientes: Cliente[] = []; // Seta o novo array
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes)); // Salva o novo array no localStorage depois de transformar em string
    return clientes;
  }

  public salvarCliente(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.push(cliente); // Adiciona o cliente ao array existente
    
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage)); // Salva o array atualizado no localStorage
  }

  public atualizarCliente(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
    })
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  public deletarCliente(cliente: Cliente) {
    const storage = this.obterStorage();    
    const index = storage.findIndex(c => c.id === cliente.id);
    // Se o cliente for encontrado, é removido do array
    if (index > -1) {
      storage.splice(index, 1);
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage)); // Atualiza o localStorage
    }
  }

  public pesquisarClientes(nomeBuscado: string): Cliente[] {
    const clientes = this.obterStorage();
    
    if (!nomeBuscado || nomeBuscado.trim() === '') {
      return clientes; // Retorna todos os clientes se o nome estiver vazio
    }
    return clientes.filter(cliente => 
      cliente.nome?.toLowerCase().includes(nomeBuscado.toLowerCase())
    );
  }

  public buscarClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(cliente => cliente.id === id)
  }
}
