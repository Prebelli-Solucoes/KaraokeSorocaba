import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-ingles',
  templateUrl: './ingles.component.html',
  styleUrls: ['./ingles.component.scss']
})
export class InglesComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy=true;
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
listaFiltraLetra:MusicasModel[]=[];
alfabeto=[{
  letra:'A',
  active:false
},
{
  letra:'B',
  active:false
},
{
  letra:'C',
  active:false
},
{
  letra:'D',
  active:false
},
{
  letra:'E',
  active:false
},
{
  letra:'F',
  active:false
},
{
  letra:'G',
  active:false
},
{
  letra:'H',
  active:false
},
{
  letra:'I',
  active:false
},
{
  letra:'J',
  active:false
},
{
  letra:'K',
  active:false
},
{
  letra:'L',
  active:false
},
{
  letra:'M',
  active:false
},
{
  letra:'N',
  active:false
},
{
  letra:'O',
  active:false
},
{
  letra:'P',
  active:false
},
{
  letra:'Q',
  active:false
},
{
  letra:'R',
  active:false
},
{
  letra:'S',
  active:false
},
{
  letra:'T',
  active:false
},
{
  letra:'U',
  active:false
},
{
  letra:'V',
  active:false
},
{
  letra:'W',
  active:false
},
{
  letra:'X',
  active:false
},
{
  letra:'Y',
  active:false
},
{
  letra:'Z',
  active:false
},
{
  letra:'#',
  active:false
}]


cantoresUnicos:string[]=[];
  constructor(private musicasService:MusicasService) { }

  ngOnInit(): void {
    this.busy=true;
    this.listaPorLetra("A");
  }
  async listaPorLetra(letraEscolhida:string){
    this.busy=true;

 this.alfabeto.forEach(letra=>{
    letra.active=false;
  });
  this.alfabeto[this.alfabeto.findIndex(letra=>letra.letra==letraEscolhida)].active=true;
  if(letraEscolhida=='#'){
    letraEscolhida='0';
   }
  if(localStorage.getItem(`listaIngles${letraEscolhida}`)!=null){
    var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem(`listaIngles${letraEscolhida}`)));
    var listaInglesLocalStorage=JSON.parse(ListaTemp);
    this.listaFiltraLetra=[];
   this.listaFiltraLetra= listaInglesLocalStorage;
  await  this.listaCantoresUnicos();
  }else{
  this.musicasService.getMusicas('ING',letraEscolhida).subscribe(
    (musicas:MusicasModel[])=>{
      this.listaFiltraLetra=[];
      this.listaFiltraLetra=musicas;
      localStorage.setItem(`listaIngles${letraEscolhida}`,JSON.stringify(this.listaFiltraLetra));  
      this.listaCantoresUnicos();
    }
    
  )
  }
  }
  async listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.cantoresUnicos=[];
      //ordena listaFiltraLetra por cantor
      this.listaFiltraLetra.sort((a,b)=>{
        if(a.cantor<b.cantor){
          return -1;
        }
        if(a.cantor>b.cantor){
          return 1;
        }
        return 0;
      }
      );
   await this.listaFiltraLetra.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
        
      }
    })

    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaFiltraLetra.filter(musica=>musica.cantor==cantor);
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
