import { MatAccordion } from '@angular/material/expansion';
import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicasModel } from '../../models/musicas-model';

@Component({
  selector: 'app-infantil',
  standalone: false,
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.scss']
})
export class InfantilComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy=true;
  listaInfantil:MusicasModel[]=[
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
    if(localStorage.getItem('listaInfantil')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaInfantil')));
      var listaInfantilLocalStorage=JSON.parse(ListaTemp);
     this.listaInfantil= listaInfantilLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('INF').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaInfantil=musicas;
        this.listaCantoresUnicos();
        localStorage.setItem('listaInfantil',JSON.stringify(this.listaInfantil));
      }
      
    )
    
    }
  }
 ngAfterViewInit(){
   
  }
  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.cantoresUnicos=[];
      //ordena listaFiltraLetra por cantor
      this.listaInfantil.sort((a,b)=>{
        if(a.cantor<b.cantor){
          return -1;
        }
        if(a.cantor>b.cantor){
          return 1;
        }
        return 0;
      }
      );
    this.listaInfantil.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })

    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaInfantil.filter(musica=>musica.cantor==cantor);
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
