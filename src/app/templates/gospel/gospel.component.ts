import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.component.html',
  styleUrls: ['./gospel.component.scss']
})
export class GospelComponent implements OnInit {
  listaGospel:MusicasModel[]=[
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
  constructor(private musicasService : MusicasService) { }

  ngOnInit(): void {
    if(localStorage.getItem('listaGospel')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaGospel')));
      var listaGospelLocalStorage=JSON.parse(ListaTemp);
     this.listaGospel= listaGospelLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('GOS').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaGospel=musicas;
        this.listaCantoresUnicos();
        localStorage.setItem('listaGospel',JSON.stringify(this.listaGospel));
      }
    
    )
   
    }
  }

  
  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.listaGospel.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaGospel.filter(musica=>musica.cantor==cantor);
  }

}
