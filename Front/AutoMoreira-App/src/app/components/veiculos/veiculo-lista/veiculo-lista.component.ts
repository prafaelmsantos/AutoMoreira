import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.css']
})
export class VeiculoListaComponent implements OnInit {

   //Modal
   modalRef?: BsModalRef;

   public veiculos: Veiculo[] = [];
   public veiculosFiltrados: Veiculo[]=[];


   public _filtroLista='';

   public get filtroLista(): string{
     return this._filtroLista;
   }
   public set filtroLista(value: string){
     this._filtroLista= value;
     this.veiculosFiltrados=this.filtroLista ? this.filtrarVeiculos(this.filtroLista):this.veiculos;
   }

   public filtrarVeiculos(filtrarPor: string):Veiculo[]{
     filtrarPor = filtrarPor.toLocaleLowerCase();
     return this.veiculos.filter(
       (veiculo : {cor: string;})=> veiculo.cor.toLocaleLowerCase().indexOf(filtrarPor) !== -1
     )
   }

   constructor(
     private veiculoService: VeiculoService,
     private modalService: BsModalService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private router: Router) {

   }

   //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
   public ngOnInit(): void {
     this.spinner.show();
     this.getVeiculos();
   }


   public getVeiculos(): void {

     //Vou fazer um get do protocolo http neste URL
     this.veiculoService.getVeiculos().subscribe({
       next: (_veiculos: Veiculo[]) => {
         this.veiculos = _veiculos;
         this.veiculosFiltrados = this.veiculos;
       },
       error: (error: any) => {
         this.spinner.hide();
         this.toastr.error('Erro ao carregar os Veiculos.', 'Erro!')

       },
       complete: () =>this.spinner.hide()

     });
   }

   //Modal
   openModal(template: TemplateRef<any>):void {
     this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
   }

   confirm(): void {
     this.modalRef?.hide();
     this.toastr.success('O Veiculo foi apagado com sucesso!', 'Apagado');
   }

   decline(): void {
     this.modalRef?.hide();
   }

   detalheEvento(veiculoId: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
  }

}
