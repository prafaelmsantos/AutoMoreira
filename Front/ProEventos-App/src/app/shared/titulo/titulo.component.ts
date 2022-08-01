import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.css']
})
export class TituloComponent implements OnInit {

  @Input() titulo: string='';
  @Input() iconClass = 'fa fa-car';
  @Input() subtitulo = 'Desde 2021';

  constructor() { }

  ngOnInit() {
  }

}
