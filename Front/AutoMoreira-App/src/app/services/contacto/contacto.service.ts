import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacto } from '@app/models/Contacto';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  baseURL = 'https://localhost:5001/api/contactos';

  constructor(private http: HttpClient) { }

  public getContactos(): Observable<Contacto[]>{

    return this.http.get<Contacto[]>(this.baseURL).pipe(take(1));

  }

  public getContactoById(id: number): Observable<Contacto>{

    return this.http.get<Contacto>(`${this.baseURL}/${id}`).pipe(take(1));

  }

  public postContacto(contacto: Contacto): Observable<Contacto> {
    return this.http.post<Contacto>(this.baseURL, contacto).pipe(take(1));
  }


  public deleteContacto(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`).pipe(take(1));
  }

}
