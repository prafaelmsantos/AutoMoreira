import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Marca } from '@app/models/Marca';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable(/*//Eu posso injectar esta classe em qualquer lugar
// como coloquei o veiculoService na app.module não é preciso colocar aqui
{
providedIn: 'root'
}*/)
export class MarcaService {

baseURL = 'https://localhost:5001/api/marcas';

constructor(private http: HttpClient) { }

  public getMarcas(): Observable<Marca[]>{

    return this.http.get<Marca[]>(this.baseURL).pipe(take(1));

  }

  public getMarcaById(id: number): Observable<Marca>{

    return this.http.get<Marca>(`${this.baseURL}/${id}`).pipe(take(1));

  }

  public postMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.baseURL, marca).pipe(take(1));
  }

  public putMarca(id: number, marca: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.baseURL}/${id}`, marca).pipe(take(1));
    // ou return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
  }

  public deleteMarca(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}

