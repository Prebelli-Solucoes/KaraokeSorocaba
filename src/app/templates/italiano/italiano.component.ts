import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-italiano',
  templateUrl: './italiano.component.html',
  styleUrls: ['./italiano.component.scss']
})
export class ItalianoComponent implements OnInit {
  listaItaliano:MusicasModel[]=[
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
    if(localStorage.getItem('listaItaliano')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaItaliano')));
      var listaItalianoLocalStorage=JSON.parse(ListaTemp);
     this.listaItaliano= listaItalianoLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('ITA').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaItaliano=musicas;
        this.listaCantoresUnicos();
        localStorage.setItem('listaItaliano',JSON.stringify(this.listaItaliano));

      }
      
    )
    }
  }
  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.listaItaliano.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaItaliano.filter(musica=>musica.cantor==cantor);
  }
}
