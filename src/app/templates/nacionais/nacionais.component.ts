import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-nacionais',
  templateUrl: './nacionais.component.html',
  styleUrls: ['./nacionais.component.scss']
})
export class NacionaisComponent implements OnInit {
  busy=false;
  listaNacionais:MusicasModel[]=[
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
  constructor(private musicasService : MusicasService) { }

  ngOnInit(): void {
    this.busy=true;
    if(localStorage.getItem('listaNacionais')!=null){
      var ListaTemp= JSON.parse(JSON.stringify(localStorage.getItem('listaNacionais')));
      var listaNacionaisLocalStorage=JSON.parse(ListaTemp);
     this.listaNacionais= listaNacionaisLocalStorage;
     this.listaPorLetra('A'); 
    }else{
    this.musicasService.getMusicas('BRA').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaNacionais=musicas;
        localStorage.setItem('listaNacionais',JSON.stringify(this.listaNacionais));
        this.listaPorLetra('A');      
      }
      
    )
    }
  }
  listaPorLetra(letraEscolhida:string){
    this.busy=true;
    
    if(letraEscolhida=='#'){
     //filtrar this.listaNacionais quando primeiro caracter de cantor for numero ou caracter especial 
     const caracteres = /[A-Za-z]/;
     this.listaFiltraLetra=this.listaNacionais.filter(musica=>!caracteres.test(musica.cantor.charAt(0)));
     this.alfabeto.forEach(letra=>{
      letra.active=false;
    });
     this.alfabeto[this.alfabeto.findIndex(letra=>letra.letra==letraEscolhida)].active=true;
    }else{

 this.alfabeto.forEach(letra=>{
    letra.active=false;
  });
 
  this.alfabeto[this.alfabeto.findIndex(letra=>letra.letra==letraEscolhida)].active=true;
  
    this.listaFiltraLetra = this.listaNacionais.filter(musica=>musica.cantor.startsWith(letraEscolhida));
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
    this.busy=false;
  }
  musicaPorCantor(cantor:string){
    return this.listaNacionais.filter(musica=>musica.cantor==cantor);
  }
}