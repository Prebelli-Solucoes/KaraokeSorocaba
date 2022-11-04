import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicasModel } from '../../models/musicas-model';


@Injectable({
  providedIn: 'root'
})
export class MusicasService {

  constructor(private http:HttpClient) { }

  getMusicas(categoria :string,letra?:string):Observable<MusicasModel[]>{
    if(letra){
      return this.http.get<MusicasModel[]>(`${environment.apiUrl}verCategoria?cat=${categoria}&letra=${letra}`);
    }else{
    return this.http.get<MusicasModel[]>(environment.apiUrl+"verCategoria?cat="+categoria);
    }
  }
  busca(termo:string):Observable<MusicasModel[]>{
    return this.http.get<MusicasModel[]>(environment.apiUrl+"Busca?termo="+termo);
  }
}
