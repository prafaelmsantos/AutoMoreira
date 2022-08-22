import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Modelo } from '@app/models/Modelo';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable(/*//Eu posso injectar esta classe em qualquer lugar
// como coloquei o veiculoService na app.module não é preciso colocar aqui
{
providedIn: 'root'
}*/)
export class ModeloService {

  baseURL = 'https://localhost:5001/api/modelos';

  constructor(private http: HttpClient) { }

    public getModelos(): Observable<Modelo[]>{

      return this.http.get<Modelo[]>(this.baseURL).pipe(take(1));

    }

    public getModeloById(id: number): Observable<Modelo>{

      return this.http.get<Modelo>(`${this.baseURL}/${id}`).pipe(take(1));

    }

    public postModelo(modelo: Modelo): Observable<Modelo> {
      return this.http.post<Modelo>(this.baseURL, modelo).pipe(take(1));
    }

    public putModelo(id: number, modelo: Modelo): Observable<Modelo> {
      return this.http.put<Modelo>(`${this.baseURL}/${id}`, modelo).pipe(take(1));
      // ou return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
    }

    public deleteModelo(id: number): Observable<any> {
      return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
    }

}
