import { MusicasService } from './../../core/services/musicas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(private musicasService: MusicasService) { }

  ngOnInit(): void {
    this.musicasService.getMusicas().subscribe(
      (musicas) => {
        console.log(musicas);
      })
  }

}
