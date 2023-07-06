import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = []
  paginaAtual : number = 1
  haMaisPensamentos : boolean = true
  filtro: string  = ''
  listaFavoritos: Pensamento[] = [];
  nomeTitulo: string = 'Meu mural';

  constructor(private service: PensamentoService, private router: Router) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos) =>{
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro).subscribe(listaPensamentos=>{
      this.listaPensamentos.push(...listaPensamentos)
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    });
  }

  pesquisarPensamentos(){
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro).subscribe((listaPensamentos)=>{
      this.listaPensamentos = listaPensamentos
    })
  }

  listarFavoritos(){
    this.nomeTitulo = 'Meus Favoritos'
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    let favorito: boolean = true
    this.service.listar(this.paginaAtual, this.filtro, favorito).subscribe((listaPensamentos)=>{
      this.listaPensamentos = listaPensamentos
      this.listaFavoritos= listaPensamentos
    })
  }

  recarregarComponente(){
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = ()=>false
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

}
