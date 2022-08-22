import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Modelo } from '@app/models/Modelo';
import { ModeloService } from '@app/services/modelo/modelo.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminModelo-lista',
  templateUrl: './adminModelo-lista.component.html',
  styleUrls: ['./adminModelo-lista.component.scss']
})
export class AdminModeloListaComponent implements OnInit {

  public modelos: Modelo[] = [];
  public modelosFiltrados: Modelo[]=[];
  public modeloId = 0;
  public _filtroLista='';
  //Modal
  modalRef?: BsModalRef;

  public get filtroLista(): string{
    return this._filtroLista;
  }
  public set filtroLista(value: string){
    this._filtroLista= value;
    this.modelosFiltrados=this.filtroLista ? this.filtrarModelos(this.filtroLista):this.modelos;
  }

  public filtrarModelos(filtrarPor: string):Modelo[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.modelos.filter(
      (modelo : {modeloNome: string;})=> modelo.modeloNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private modeloService:ModeloService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
  public ngOnInit(): void {
    this.spinner.show();
    this.carregarModelos();
  }

  public carregarModelos(): void {

    //Vou fazer um get do protocolo http neste URL
    this.modeloService.getModelos().subscribe({
      next: (_modelos: Modelo[]) => {
        this.modelos = _modelos;
        this.modelosFiltrados = this.modelos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Modelos.', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }
     //Modal
  openModal(event:any, template: TemplateRef<any>, modeloId: number):void {
    event.stopPropagation();
    this.modeloId = modeloId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.modeloService.deleteModelo(this.modeloId).subscribe(
     (result: any) => {
       if (result.message === 'Apagado'){
       console.log(result); // Retorna o "Apagado do controler da API". Nesta caso aparece na consola: mesagem: "Apagado". Não é necessario este if. Para tal passar o any do result para string

       this.toastr.success('O Modelo foi apagado com sucesso.', 'Apagado!');
       this.spinner.hide();
       this.carregarModelos();
       }
     },
     (error: any) => {
       console.error(error);
       this.toastr.error(`Erro ao tentar apagar o modelo ${this.modeloId}`, 'Erro!');
       this.spinner.hide();
     },
     () => this.spinner.hide(),

   );

  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheModelo(id: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`admin/modelo/detalhe/${id}`]);
  }

}
