import { MusicasModel } from './../../models/musicas-model';
import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
dataStorage:Date = new Date();
dataAtual:Date = new Date();
termo:string='';
desabilitado=true;
  constructor(private musicasService: MusicasService,private route:Router) { }

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
validaBotao(){
  if(this.termo.length>3){
    this.desabilitado=false;
  }else{
    this.desabilitado=true;
  }
}
  buscar(){
    this.route.navigate(['/busca/'+this.termo]);
  }
}
