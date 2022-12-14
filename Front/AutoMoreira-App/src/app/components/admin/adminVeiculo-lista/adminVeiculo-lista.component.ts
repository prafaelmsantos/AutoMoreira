import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo/veiculo.service';
import { PaginatedResult, Pagination } from '@app/models/pagination';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-adminVeiculo-lista',
  templateUrl: './adminVeiculo-lista.component.html',
  styleUrls: ['./adminVeiculo-lista.component.css']
})
export class AdminVeiculoListaComponent implements OnInit {

   //Modal
   modalRef?: BsModalRef;

   public veiculos: Veiculo[] = [];
   public veiculoId = 0;
   public pagination = {} as Pagination;

   public larguraImg = 160;
   public margemImg = 2;
   public exibirImg = true;

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
     private modalService: BsModalService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private router: Router) {

   }

   //ngOnInit ?? um metodo que vai ser
   //chamado antes de ser inicializado a aplica????o. Antes do HTML ser interpretado
   public ngOnInit(): void {
    this.pagination = {currentPage: 1, itemsPerPage:3, totalItems: 1} as Pagination;
     this.carregarVeiculos();
   }

   public alterarEstadoImg(): void{
    this.exibirImg = !this.exibirImg;
  }


/*    public carregarVeiculos(): void {
    this.spinner.show();
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
   } */
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

   //Modal
   openModal(event:any, template: TemplateRef<any>, veiculoId: number):void {
    event.stopPropagation();
    this.veiculoId = veiculoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarVeiculos();
  }


  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.veiculoService.deleteVeiculo(this.veiculoId).subscribe(
     (result: any) => {
       if (result.message === 'Apagado'){
        // Retorna o "Apagado do controler da API".
        //Nesta caso aparece na consola: mesagem: "Apagado".
        //N??o ?? necessario este if. Para tal passar o any do result para string
       console.log(result);

       this.toastr.success('O Veiculo foi apagado com sucesso.', 'Apagado!');
       this.spinner.hide();
       this.carregarVeiculos();
       }
     },
     (error: any) => {
       console.error(error);
       this.toastr.error(`Erro ao tentar apagar o veiculo ${this.veiculoId}`, 'Erro!');
       this.spinner.hide();
     },
     () => this.spinner.hide(),


   );

  }

  decline(): void {
    this.modalRef?.hide();
  }

   detalheVeiculo(id: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`admin/veiculo/detalhe/${id}`]);
  }

  public mostraImagem(imagemURL: string) : string {
    return imagemURL !== ''
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/imageNotAvailable.jpg';
   }


}
