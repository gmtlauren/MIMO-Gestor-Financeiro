
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovimentacaoService, Movimentacao } from './services/movimentacao';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  hoje: string = new Date().toLocaleDateString('pt-BR');

  movimentacoes: Movimentacao[] = [];

  descricao: string = '';
  tipo: 'receita' | 'despesa' = 'receita';
  categoria: string = '';
  valor: number | null = null;
  data: string = new Date().toISOString().substring(0, 10);

  constructor(private movimentacaoService: MovimentacaoService) {}

  ngOnInit(): void {
    this.listarMovimentacoes();
  }

  listarMovimentacoes(): void {
    this.movimentacaoService.listar().subscribe({
      next: (dados) => {
        this.movimentacoes = dados;
      },
      error: (erro) => {
        console.error('Erro ao buscar movimentações:', erro);
      }
    });
  }

  cadastrarMovimentacao(): void {

    if (this.valor === null || this.valor <= 0) {
      alert('Informe um valor válido!');
      return;
    }

    const novaMovimentacao: Movimentacao = {
      descricao: this.descricao,
      tipo: this.tipo,
      categoria: this.categoria,
      valor: this.valor,
      data: this.data
    };

    this.movimentacaoService.cadastrar(novaMovimentacao).subscribe({

      next: () => {
        alert('Movimentação cadastrada com sucesso!');

        this.descricao = '';
        this.tipo = 'receita';
        this.categoria = '';
        this.valor = null;
        this.data = new Date().toISOString().substring(0, 10);

        this.listarMovimentacoes();
      },

      error: (erro) => {
        console.error('Erro ao cadastrar:', erro);
        alert('Não foi possível cadastrar a movimentação.');
      }

    });

  }


}
