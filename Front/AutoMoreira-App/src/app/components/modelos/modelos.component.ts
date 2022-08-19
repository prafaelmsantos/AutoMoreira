import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styleUrls: ['./modelos.component.css']
})
export class ModelosComponent implements OnInit {

  public modelos: any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getModelos();
  }

  public getModelos(): void {
    this.http.get('https://localhost:5001/api/modelos').subscribe(
      response => {
        this.modelos = response;
      },
      error => console.log(error)
    );
  }

}
