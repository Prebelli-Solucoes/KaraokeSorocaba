import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicasModel } from '../../models/musicas-model';


@Injectable({
  providedIn: 'root'
})
export class MusicasService {

  constructor(private http: HttpClient) { }

  getMusicas(categoria: string, letra?: string): Observable<MusicasModel[]> {
    let params = new HttpParams().set('cat', categoria);
    if (letra) {
      params = params.set('letra', letra);
    }
    return this.http.get<MusicasModel[]>(`${environment.apiUrl}verCategoria`, { params });
  }

  busca(termo: string): Observable<MusicasModel[]> {
    const params = new HttpParams().set('termo', termo);
    return this.http.get<MusicasModel[]>(`${environment.apiUrl}Busca`, { params });
  }
}
