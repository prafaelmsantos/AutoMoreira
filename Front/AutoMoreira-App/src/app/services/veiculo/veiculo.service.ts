import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../../models/Veiculo';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable(
    /*//Eu posso injectar esta classe em qualquer lugar
  // como coloquei o veiculoService na app.module não é preciso colocar aqui
  {
  providedIn: 'root'
  }*/
)
export class VeiculoService {

baseURL = 'https://localhost:5001/api/veiculos';

constructor(private http: HttpClient) { }

  public getVeiculos(): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(this.baseURL).pipe(take(1));

  }

  public getVeiculoById(id: number): Observable<Veiculo>{

    return this.http.get<Veiculo>(`${this.baseURL}/${id}`).pipe(take(1));

  }

  public postVeiculo(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.baseURL, veiculo).pipe(take(1));
  }

  public putVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.baseURL}/${id}`, veiculo).pipe(take(1));
    // ou return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
  }

  public deleteVeiculo(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

  postUpload(veiculoId: number, file: File): Observable<Veiculo> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload);

    return this.http
      .post<Veiculo>(`${this.baseURL}/upload-image/${veiculoId}`, formData)
      .pipe(take(1));
  }
}
