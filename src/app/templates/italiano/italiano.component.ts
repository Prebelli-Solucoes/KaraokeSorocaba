import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-italiano',
  templateUrl: './italiano.component.html',
  styleUrls: ['./italiano.component.scss']
})
export class ItalianoComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy=true;
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
      //ordena listaFiltraLetra por cantor
      this.listaItaliano.sort((a,b)=>{
        if(a.cantor<b.cantor){
          return -1;
        }
        if(a.cantor>b.cantor){
          return 1;
        }
        return 0;
      }
      );
    this.listaItaliano.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })

    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaItaliano.filter(musica=>musica.cantor==cantor);
  }
  toTop(){
    this.accordion.closeAll()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
