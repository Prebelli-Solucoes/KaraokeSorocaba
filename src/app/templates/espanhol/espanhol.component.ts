import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-espanhol',
  templateUrl: './espanhol.component.html',
  styleUrls: ['./espanhol.component.scss']
})
export class EspanholComponent implements OnInit {
listaEspanhol:MusicasModel[]=[
  {
    id:1,
    nome:'',
    cantor:'',
    categoria:'',
    trecho:'',
    codigo:0
  }
]
cantoresUnicos:string[]=[];
  constructor(private musicasService:MusicasService) { }

  ngOnInit(): void {
    if(localStorage.getItem('listaEspanhol')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaEspanhol')));
      var listaEspanholLocalStorage=JSON.parse(ListaTemp);
     this.listaEspanhol= listaEspanholLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('ESP').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaEspanhol=musicas;
        this.listaCantoresUnicos();
        localStorage.setItem('listaEspanhol',JSON.stringify(this.listaEspanhol));
      }
      
    )
    
    }
  }

  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.listaEspanhol.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaEspanhol.filter(musica=>musica.cantor==cantor);
  }
}
