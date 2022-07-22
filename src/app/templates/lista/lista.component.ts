import { MusicasModel } from './../../models/musicas-model';
import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
dataStorage:Date = new Date();
dataAtual:Date = new Date();
  constructor(private musicasService: MusicasService) { }

  ngOnInit(): void {
   if(localStorage.getItem('dataStorage')!=null){
     this.dataStorage= new Date(JSON.parse(JSON.stringify(localStorage.getItem('dataStorage'))));
     // se data storage for 15 dias antes da data atual, zerar todos os localStorage
      if(this.dataStorage.getTime()<this.dataAtual.getTime()-15*24*60*60*1000){
        localStorage.clear();
        localStorage.setItem('dataStorage',JSON.stringify(this.dataAtual));
      }
   }else{
      localStorage.setItem('dataStorage',JSON.stringify(this.dataAtual));
   }
}

}
