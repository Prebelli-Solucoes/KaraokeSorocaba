import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-ingles',
  templateUrl: './ingles.component.html',
  styleUrls: ['./ingles.component.scss']
})
export class InglesComponent implements OnInit {
listaIngles:MusicasModel[]=[
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
    if(localStorage.getItem('listaIngles')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaIngles')));
      var listaInglesLocalStorage=JSON.parse(ListaTemp);
     this.listaIngles= listaInglesLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('ING').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaIngles=musicas;
        this.listaCantoresUnicos();
        localStorage.setItem('listaIngles',JSON.stringify(this.listaIngles));
       
      }
      
    )
   
    }
  }

  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.listaIngles.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaIngles.filter(musica=>musica.cantor==cantor);
  }
}
