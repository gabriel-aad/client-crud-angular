# Client-CRUD-Angular

Exercício de aplicação em Angular para realizar operações básicas de **CRUD** (Create, Read, Update, Delete), integrando:

- Máscaras personalizadas nos inputs;
- Consumo de API externa para preenchimento automático de endereços;
- Estilização com **Angular Material**.

---

##  Tecnologias utilizadas

- **Angular** (versão 20)
- **Angular Material** 
- **ngx-mask** (versão 20.0.3)
- API externa ([Brasil API](https://brasilapi.com.br/))

---

## Funcionalidades

1. **Listagem de clientes**:
   - Exibição dos registros existentes em uma tabela estilizada com Angular Material.
2. **Criação de cliente**:
   - Formulário com validação;
   - Aplicação de máscara para formatação automática.
3. **Edição de cliente**:
   - Reutilização do formulário com dados pré-carregados;
   - Atualização e persistência via local storage do browser.
4. **Exclusão de cliente**.
5. **Endereço direcionado**:
   - Aquisição de cidades conforme a UF informada pelo usuário.

---

## Instalação

### Pré-requisitos

- Angular CLI (versão 20.0.1)
- Acesso à internet para chamadas à API de CEP

### Passos

```bash
git clone https://github.com/gabriel-aad/client-crud-angular.git
cd client-crud-angular
npm install
ng serve
```
