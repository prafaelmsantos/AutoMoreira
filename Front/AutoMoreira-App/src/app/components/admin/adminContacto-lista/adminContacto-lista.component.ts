import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Contacto } from '@app/models/Contacto';
import { ContactoService } from '@app/services/contacto/contacto.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminContacto-lista',
  templateUrl: './adminContacto-lista.component.html',
  styleUrls: ['./adminContacto-lista.component.scss']
})
export class AdminContactoListaComponent implements OnInit {

  public contactos: Contacto[] = [];
  public contactosFiltrados: Contacto[]=[];
  public contactoId = 0;
  public _filtroLista='';
  //Modal
  modalRef?: BsModalRef;

  public get filtroLista(): string{
    return this._filtroLista;
  }
  public set filtroLista(value: string){
    this._filtroLista= value;
    this.contactosFiltrados=this.filtroLista ? this.filtrarContactos(this.filtroLista):this.contactos;
  }

  public filtrarContactos(filtrarPor: string):Contacto[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.contactos.filter(
      (contacto : {nome: string;})=> contacto.nome.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    )
  }

  constructor(
    private contactoService: ContactoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
  public ngOnInit(): void {
    this.spinner.show();
    this.carregarContactos();
  }

  public carregarContactos(): void {
    //Vou fazer um get do protocolo http neste URL
    this.contactoService.getContactos().subscribe({
      next: (_contactos: Contacto[]) => {
        this.contactos = _contactos;
        this.contactosFiltrados = this.contactos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Contactos.', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }
     //Modal
  openModal(event:any, template: TemplateRef<any>, contactoId: number):void {
    event.stopPropagation();
    this.contactoId = contactoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.contactoService.deleteContacto(this.contactoId).subscribe(
     (result: any) => {
       if (result.message === 'Apagado'){
       console.log(result); // Retorna o "Apagado do controler da API". Nesta caso aparece na consola: mesagem: "Apagado". Não é necessario este if. Para tal passar o any do result para string

       this.toastr.success('A mensagem de cliente foi apagada com sucesso!', 'Apagado!');
       this.spinner.hide();
       this.carregarContactos();
       }
     },
     (error: any) => {
       console.error(error);
       this.toastr.error(`Erro ao tentar apagar a mensagem de cliente ${this.contactoId}`, 'Erro!');
       this.spinner.hide();
     },
     () => this.spinner.hide(),


   );

  }

  decline(): void {
    this.modalRef?.hide();
  }

}
