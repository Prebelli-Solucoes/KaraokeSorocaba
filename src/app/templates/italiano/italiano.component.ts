import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';
import { MusicasModel } from 'src/app/models/musicas-model';

@Component({
  selector: 'app-italiano',
  templateUrl: './italiano.component.html',
  styleUrls: ['./italiano.component.scss']
})
export class ItalianoComponent implements OnInit {
  listaItaliano:MusicasModel[]=[
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
    this.musicasService.getMusicas('ITA').subscribe(
      (musicas:MusicasModel[])=>{
        this.listaItaliano=musicas;
        console.log(musicas);
      }
      
    )
  }

}
