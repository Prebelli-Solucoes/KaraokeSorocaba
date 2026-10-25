import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: false,
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  dataStorage: Date = new Date();
  dataAtual: Date = new Date();
  termo = '';

  constructor(private route: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('dataStorage') != null) {
      this.dataStorage = new Date(JSON.parse(JSON.stringify(localStorage.getItem('dataStorage'))));
      if (this.dataStorage.getTime() < this.dataAtual.getTime() - 15 * 24 * 60 * 60 * 1000) {
        localStorage.clear();
        localStorage.setItem('dataStorage', JSON.stringify(this.dataAtual));
      }
    } else {
      localStorage.setItem('dataStorage', JSON.stringify(this.dataAtual));
    }
  }

  buscar(): void {
    const termo = this.termo.trim();
    if (termo.length < 4) {
      return;
    }
    this.route.navigate(['/busca', termo]);
  }
}
