import { Estado, Municipio } from './brasilapi.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrasilapiService {
  baseUrl: string = 'https://brasilapi.com.br/api';

  constructor(private http: HttpClient) { }

  public listarUfs(): Observable<Estado[]> {
    const path: string = '/ibge/uf/v1'
    return this.http.get<Estado[]>(this.baseUrl + path);
  }

  public listarMunicipios(uf: string) : Observable<Municipio[]> {
    const path = '/ibge/municipios/v1/' + uf
    return this.http.get<Municipio[]>(this.baseUrl + path);
  }
}
