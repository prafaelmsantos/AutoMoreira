import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo/veiculo.service';
import { PaginatedResult, Pagination } from '@app/models/pagination';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-veiculo-lista',
  templateUrl: './veiculo-lista.component.html',
  styleUrls: ['./veiculo-lista.component.css']
})
export class VeiculoListaComponent implements OnInit {

   //Modal
   modalRef?: BsModalRef;

   public veiculos: Veiculo[] = [];
   public pagination = {} as Pagination;


   termoBuscaChanged: Subject<string> = new Subject<string>();
   public filtrarEventos(evt: any): void {
    if (this.termoBuscaChanged.observers.length === 0) {
      this.termoBuscaChanged
        .pipe(debounceTime(1500))
        .subscribe((filtrarPor) => {
          this.spinner.show();
          this.veiculoService
            .getVeiculos(
              this.pagination.currentPage,
              this.pagination.itemsPerPage,
              filtrarPor
            ).subscribe(
              (paginatedResult: PaginatedResult<Veiculo[]>) => {
                this.veiculos = paginatedResult.result;
                this.pagination = paginatedResult.pagination;
              },
              (error: any) => {
                this.spinner.hide();
                this.toastr.error('Erro ao carregar os Vventos', 'Erro!');
              }
            )
            .add(() => this.spinner.hide());
        });
    }
    this.termoBuscaChanged.next(evt.value);
  }

   constructor(
     private veiculoService: VeiculoService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private router: Router) {

   }

   //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
   public ngOnInit(): void {
    this.pagination = {currentPage: 1, itemsPerPage:3, totalItems: 1} as Pagination;
    this.carregarVeiculos();
   }

   public carregarVeiculos(): void {
    this.spinner.show();

     //Vou fazer um get do protocolo http neste URL
     this.veiculoService.getVeiculos(
                      this.pagination.currentPage,
                      this.pagination.itemsPerPage).subscribe({
       next: (paginatedResult: PaginatedResult<Veiculo[]>) => {
         this.veiculos = paginatedResult.result;
         this.pagination = paginatedResult.pagination;
       },
       error: (error: any) => {
         this.spinner.hide();
         this.toastr.error('Erro ao carregar os Veiculos.', 'Erro!')

       },
       complete: () =>this.spinner.hide()

     });
   }

   public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarVeiculos();
  }

   detalheVeiculo(veiculoId: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
  }

  public mostraImagem(imagemURL: string) : string {
    return imagemURL !== '' || imagemURL !== null
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/imageNotAvailable.jpg';
   }

}
