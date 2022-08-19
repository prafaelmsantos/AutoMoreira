import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo/veiculo.service';

@Component({
  selector: 'app-adminVeiculo-lista',
  templateUrl: './adminVeiculo-lista.component.html',
  styleUrls: ['./adminVeiculo-lista.component.css']
})
export class AdminVeiculoListaComponent implements OnInit {

   //Modal
   modalRef?: BsModalRef;

   public veiculos: Veiculo[] = [];
   public veiculosFiltrados: Veiculo[]=[];
   public veiculoId = 0;

   public larguraImg = 160;
   public margemImg = 2;
   public exibirImg = true;
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
     this.carregarVeiculos();
   }

   public alterarEstadoImg(): void{
    this.exibirImg = !this.exibirImg;
  }


   public carregarVeiculos(): void {

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
   openModal(event:any, template: TemplateRef<any>, veiculoId: number):void {
    event.stopPropagation();
    this.veiculoId = veiculoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }


   confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.veiculoService.deleteVeiculo(this.veiculoId).subscribe(
     (result: any) => {
       if (result.message === 'Apagado'){
       console.log(result); // Retorna o "Apagado do controler da API". Nesta caso aparece na consola: mesagem: "Apagado". Não é necessario este if. Para tal passar o any do result para string

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

   detalheEvento(id: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`admin/detalhe/${id}`]);
  }

  public mostraImagem(imagemURL: string) : string {
    return imagemURL !== ''
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/imageNotAvailable.jpg';
   }


}
