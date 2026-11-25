
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movimentacao {
  _id?: string;
  descricao: string;
  tipo: 'receita' | 'despesa';
  categoria: string;
  valor: number;
  data: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimentacaoService {

  private apiUrl = 'http://localhost:3000/api/movimentacoes';

  constructor(private http: HttpClient) {}

  listar(): Observable<Movimentacao[]> {
    return this.http.get<Movimentacao[]>(this.apiUrl);
  }

  cadastrar(movimentacao: Movimentacao): Observable<Movimentacao> {
    return this.http.post<Movimentacao>(this.apiUrl, movimentacao);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
