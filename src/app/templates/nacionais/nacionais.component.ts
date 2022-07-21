import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-nacionais',
  templateUrl: './nacionais.component.html',
  styleUrls: ['./nacionais.component.scss']
})
export class NacionaisComponent implements OnInit {
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
  constructor(private musicasService : MusicasService) { }

  ngOnInit(): void {
    this.musicasService.getMusicas('BRA').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaNacionais=musicas;
        console.log(musicas);
      }
      
    )
  }

}
