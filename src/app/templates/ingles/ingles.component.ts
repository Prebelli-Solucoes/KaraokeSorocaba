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
    if(localStorage.getItem('listaIngles')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaIngles')));
      var listaInglesLocalStorage=JSON.parse(ListaTemp);
     this.listaIngles= listaInglesLocalStorage;
     this.listaPorLetra('A'); 
    }else{
    this.musicasService.getMusicas('ING').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaIngles=musicas;
        localStorage.setItem('listaIngles',JSON.stringify(this.listaIngles));
        this.listaPorLetra('A');      
      }
      
    )
    }
  }
  listaPorLetra(letraEscolhida:string){
    if(letraEscolhida=='#'){
     //filtrar this.listaIngles quando primeiro caracter de cantor for numero ou caracter especial 
     const caracteres = /[A-Za-z]/;
     this.listaFiltraLetra=this.listaIngles.filter(musica=>!caracteres.test(musica.cantor.charAt(0)));
     this.alfabeto.forEach(letra=>{
      letra.active=false;
    });
     this.alfabeto[this.alfabeto.findIndex(letra=>letra.letra==letraEscolhida)].active=true;
    }else{

 this.alfabeto.forEach(letra=>{
    letra.active=false;
  });
 
  this.alfabeto[this.alfabeto.findIndex(letra=>letra.letra==letraEscolhida)].active=true;
  
    this.listaFiltraLetra = this.listaIngles.filter(musica=>musica.cantor.startsWith(letraEscolhida));
}
    this.listaCantoresUnicos(); 
    return this.listaFiltraLetra;
  }
  listaCantoresUnicos(){
    // separa somente os cantores unicos
    this.cantoresUnicos=[];
    this.listaFiltraLetra.forEach(musica=>{
      if(!this.cantoresUnicos.includes(musica.cantor)){
        this.cantoresUnicos.push(musica.cantor);
      }
    })
  }
  musicaPorCantor(cantor:string){
    return this.listaIngles.filter(musica=>musica.cantor==cantor);
  }
}
