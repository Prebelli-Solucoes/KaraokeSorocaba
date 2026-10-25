import { MatAccordion } from '@angular/material/expansion';
import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicasModel } from '../../models/musicas-model';

@Component({
  selector: 'app-gospel',
  standalone: false,
  templateUrl: './gospel.component.html',
  styleUrls: ['./gospel.component.scss']
})
export class GospelComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy=true;
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
    this.busy=true;
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
    this.cantoresUnicos=[];
      //ordena listaFiltraLetra por cantor
        //ordena listaFiltraLetra por cantor
    this.listaGospel.sort((a,b)=>{
      if(a.cantor<b.cantor){
        return -1;
      }
      if(a.cantor>b.cantor){
        return 1;
      }
      return 0;
    }
    );
    this.listaGospel.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  
    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaGospel.filter(musica=>musica.cantor==cantor);
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
