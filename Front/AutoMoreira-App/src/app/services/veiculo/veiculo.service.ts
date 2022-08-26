import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Veiculo } from '../../models/Veiculo';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from '@app/models/pagination';

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

/*   public getVeiculos(): Observable<Veiculo[]>{

    return this.http.get<Veiculo[]>(this.baseURL).pipe(take(1));

  } */
  public getVeiculos(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Veiculo[]>> {
    const paginatedResult: PaginatedResult<Veiculo[]> = new PaginatedResult<Veiculo[]>();

    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    if (term != null && term != '')
      params = params.append('term', term)
      return this.http
      .get<Veiculo[]>(this.baseURL, {observe: 'response', params })
      .pipe(
        take(1),
        map((response) => {
          //O body é todo o retorno da API
          paginatedResult.result = response.body;
          if(response.headers.has('Pagination')) {
            //Vai buscar o que esta na header
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }));
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
