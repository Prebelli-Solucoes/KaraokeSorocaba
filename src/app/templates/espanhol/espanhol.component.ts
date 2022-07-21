import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-espanhol',
  templateUrl: './espanhol.component.html',
  styleUrls: ['./espanhol.component.scss']
})
export class EspanholComponent implements OnInit {
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
  constructor(private musicasService:MusicasService) { }

  ngOnInit(): void {
    this.musicasService.getMusicas('ESP').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaEspanhol=musicas;
        console.log(musicas);
      }
      
    )
  }

}
