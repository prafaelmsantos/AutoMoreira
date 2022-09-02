import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contacto } from '@app/models/Contacto';
import { ContactoService } from '@app/services/contacto/contacto.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  contacto = {} as Contacto;

  estadoBtn: boolean = false;

  dataHora(numOfHours: number) {
    let dateTime = new Date();
    dateTime.setTime(dateTime.getTime() + numOfHours * 60 * 60 * 1000);

    return dateTime.toISOString();
  }

  get f(): any {
    return this.form.controls;
  }

  constructor(
    private formBuilder:FormBuilder,
    private ActivatedRouter: ActivatedRoute,
    private contactoService: ContactoService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.validation();
  }

  public validation():void {

    this.form = this.formBuilder.group(
      {
        nome: ['',[Validators.required]],
        email: ['',[Validators.required]],
        telefone: ['',[Validators.required]],
        mensagem: ['',[Validators.required]],
        dataHora: [this.dataHora(1),[Validators.required]]
      }
    );
  }


  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }
  public resetForm(): void {
    this.form.reset();
  }

  public guardarContacto(): void {
    this.spinner.show();
    if (this.form.valid) {
        this.contacto =  {...this.form.value}; //Todos os campos do formulario

        this.contactoService.postContacto(this.contacto).subscribe({
          next: (contactoRetorno: Contacto) => {
            //this.router.navigate([`admin/marca/detalhe/${marcaRetorno.marcaId}`]);
            this.toastr.success('Mensagem enviada com sucesso!', 'Sucesso');
            //Depois de enviar a mensagem, limpa o form
            this.resetForm();
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao enviar a mensagem!', 'Erro');
          },
          complete: () => this.spinner.hide()
        });

    }
  }

}
