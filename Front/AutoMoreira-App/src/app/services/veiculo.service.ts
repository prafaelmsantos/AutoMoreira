import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veiculo } from '../models/Veiculo';
import { Observable } from 'rxjs';
import { Modelo } from '../models/Modelo';

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

public getModelos(): Observable<Modelo[]>{

  return this.http.get<Modelo[]>(this.baseURLModelos);

}

public getModeloById(id: number): Observable<Modelo>{

  return this.http.get<Modelo>(`${this.baseURLModelos}/${id}`);

}

public getModeloByMarcaId(id: number): Observable<Modelo>{

  return this.http.get<Modelo>(`${this.baseURLModelos}/marcaId/${id}`);

}

}
