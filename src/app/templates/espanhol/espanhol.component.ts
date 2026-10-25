import { MatAccordion } from '@angular/material/expansion';
import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicasModel } from '../../models/musicas-model';

@Component({
  selector: 'app-espanhol',
  standalone: false,
  templateUrl: './espanhol.component.html',
  styleUrls: ['./espanhol.component.scss']
})
export class EspanholComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy=true;
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
    this.busy=true;
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
    this.cantoresUnicos=[];
      //ordena listaFiltraLetra por cantor
      this.listaEspanhol.sort((a,b)=>{
        if(a.cantor<b.cantor){
          return -1;
        }
        if(a.cantor>b.cantor){
          return 1;
        }
        return 0;
      }
      );
    this.listaEspanhol.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })

    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaEspanhol.filter(musica=>musica.cantor==cantor);
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
