import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../models/Veiculo';
import { Observable } from 'rxjs';
import { Modelo } from '../models/Modelo';
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

  baseURLModelos = 'https://localhost:5001/api/modelos';

constructor(private http: HttpClient) { }

public getVeiculos(): Observable<Veiculo[]>{

  return this.http.get<Veiculo[]>(this.baseURL);

}

public getVeiculoById(id: number): Observable<Veiculo>{

  return this.http.get<Veiculo>(`${this.baseURL}/${id}`);

}

public postVeiculo(veiculo: Veiculo): Observable<Veiculo> {
  return this.http.post<Veiculo>(this.baseURL, veiculo);
}

public putVeiculo(id: number, veiculo: Veiculo): Observable<Veiculo> {
  return this.http.put<Veiculo>(`${this.baseURL}/${id}`, veiculo);
  // ou return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento);
}

public deleteVeiculo(id: number): Observable<any> {
  return this.http.delete(`${this.baseURL}/${id}`);
}

public getModelos(): Observable<Modelo[]>{

  return this.http.get<Modelo[]>(this.baseURLModelos);

}

public getModeloById(id: number): Observable<Modelo>{

  return this.http.get<Modelo>(`${this.baseURLModelos}/${id}`);

}

public getModeloByMarcaId(id: number): Observable<Modelo>{

  return this.http.get<Modelo>(`${this.baseURLModelos}/marcaId/${id}`);

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
