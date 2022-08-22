import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from '@app/models/Marca';
import { MarcaService } from '@app/services/marca/marca.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminMarca-lista',
  templateUrl: './adminMarca-lista.component.html',
  styleUrls: ['./adminMarca-lista.component.scss']
})
export class AdminMarcaListaComponent implements OnInit {

  public marcas: Marca[] = [];
  public marcasFiltrados: Marca[]=[];
  public marcaId = 0;
  public _filtroLista='';
  //Modal
  modalRef?: BsModalRef;

  public get filtroLista(): string{
    return this._filtroLista;
  }
  public set filtroLista(value: string){
    this._filtroLista= value;
    this.marcasFiltrados=this.filtroLista ? this.filtrarMarcas(this.filtroLista):this.marcas;
  }

  public filtrarMarcas(filtrarPor: string):Marca[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.marcas.filter(
      (marca : {marcaNome: string;})=> marca.marcaNome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private marcaService: MarcaService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
  public ngOnInit(): void {
    this.spinner.show();
    this.carregarMarcas();
  }

  public carregarMarcas(): void {
    //Vou fazer um get do protocolo http neste URL
    this.marcaService.getMarcas().subscribe({
      next: (_marcas: Marca[]) => {
        this.marcas = _marcas;
        this.marcasFiltrados = this.marcas;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as Marcas.', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }
     //Modal
  openModal(event:any, template: TemplateRef<any>, marcaId: number):void {
    event.stopPropagation();
    this.marcaId = marcaId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.marcaService.deleteMarca(this.marcaId).subscribe(
     (result: any) => {
       if (result.message === 'Apagado'){
       console.log(result); // Retorna o "Apagado do controler da API". Nesta caso aparece na consola: mesagem: "Apagado". Não é necessario este if. Para tal passar o any do result para string

       this.toastr.success('A Marca foi apagada com sucesso.', 'Apagado!');
       this.spinner.hide();
       this.carregarMarcas();
       }
     },
     (error: any) => {
       console.error(error);
       this.toastr.error(`Erro ao tentar apagar o veiculo ${this.marcaId}`, 'Erro!');
       this.spinner.hide();
     },
     () => this.spinner.hide(),


   );

  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheMarca(id: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`admin/marca/detalhe/${id}`]);
  }


}
