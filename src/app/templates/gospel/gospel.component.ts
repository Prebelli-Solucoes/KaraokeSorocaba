import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-gospel',
  templateUrl: './gospel.component.html',
  styleUrls: ['./gospel.component.scss']
})
export class GospelComponent implements OnInit {
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
  constructor(private musicasService : MusicasService) { }

  ngOnInit(): void {
    this.musicasService.getMusicas('GOS').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaGospel=musicas;
        console.log(musicas);
      }
      
    )
  }

}
