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
  constructor(private musicasService:MusicasService) { }

  ngOnInit(): void {
    this.musicasService.getMusicas('ING').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaIngles=musicas;
        console.log(musicas);
      }
      
    )
  }

}
