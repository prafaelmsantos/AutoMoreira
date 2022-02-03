import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css']
})
export class MarcasComponent implements OnInit {

  public marcas: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getMarcas();
  }

  public getMarcas(): void {
    this.http.get('https://localhost:5001/api/marcas').subscribe(
      response => {
        this.marcas = response;
      },
      error => console.log(error)
    );
  }

}
