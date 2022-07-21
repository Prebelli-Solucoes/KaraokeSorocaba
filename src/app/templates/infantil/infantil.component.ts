import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-infantil',
  templateUrl: './infantil.component.html',
  styleUrls: ['./infantil.component.scss']
})
export class InfantilComponent implements OnInit {
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
    if(localStorage.getItem('listaInfantil')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaInfantil')));
      var listaInfantilLocalStorage=JSON.parse(ListaTemp);
     this.listaInfantil= listaInfantilLocalStorage;
      this.listaCantoresUnicos();
    }else{
    this.musicasService.getMusicas('INF').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaInfantil=musicas;
        
        localStorage.setItem('listaInfantil',JSON.stringify(this.listaInfantil));
      }
      
    )
    this.listaCantoresUnicos();
    }
  }
 ngAfterViewInit(){
   
  }
  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.listaInfantil.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaInfantil.filter(musica=>musica.cantor==cantor);
  }
}
