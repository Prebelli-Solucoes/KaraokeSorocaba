import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { MusicasService } from '../../core/services/musicas.service';
import { MusicasModel } from '../../models/musicas-model';

@Component({
  selector: 'app-busca',
  standalone: false,
  templateUrl: './busca.component.html',
  styleUrls: ['./busca.component.scss']
})
export class BuscaComponent implements OnInit {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  busy = true;
  termo = '';
  musicas: MusicasModel[] = [];
  cantoresUnicos: string[] = [];

  constructor(
    private musicasService: MusicasService,
    private route: ActivatedRoute,
    private router: Router,
    private destroyRef: DestroyRef
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(params => {
        this.termo = params.get('termo') ?? '';
        this.carregar();
      });
  }

  carregar(): void {
    if (this.termo.length < 4) {
      this.musicas = [];
      this.listaCantoresUnicos();
      return;
    }

    this.busy = true;
    this.musicasService.busca(this.termo).subscribe({
      next: (musicas) => {
        this.musicas = musicas;
        this.listaCantoresUnicos();
      },
      error: () => {
        this.musicas = [];
        this.listaCantoresUnicos();
      }
    });
  }

  listaCantoresUnicos(): void {
    const cantores = new Set(this.musicas.map(musica => musica.cantor));
    this.cantoresUnicos = [...cantores].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    this.busy = false;
  }

  musicaPorCantor(cantor: string): MusicasModel[] {
    return this.musicas.filter(musica => musica.cantor === cantor);
  }

  buscar(): void {
    const termo = this.termo.trim();
    if (termo.length < 4) {
      return;
    }
    this.router.navigate(['/busca', termo]);
  }

  toTop(): void {
    this.accordion.closeAll();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}
