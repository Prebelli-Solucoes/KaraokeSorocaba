import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute } from '@angular/router';
import { MusicasService } from '../../core/services/musicas.service';
import { MusicasModel } from '../../models/musicas-model';

@Component({
  selector: 'app-busca',
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
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
  termo:string='';
  cantoresUnicos:string[]=[];
  constructor(private musicasService:MusicasService, private route : ActivatedRoute) { }
  ngOnInit(): void {
    this.termo = this.route.snapshot.params['termo']
    this.busy=true;
    this.musicasService.busca(this.termo).subscribe(
      (musicas:MusicasModel[])=>{
        this.listaInfantil=musicas;
        this.listaCantoresUnicos();
      }
      
    )

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
