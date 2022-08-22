import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '@app/models/Marca';
import { MarcaService } from '@app/services/marca/marca.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminMarca-detalhe',
  templateUrl: './adminMarca-detalhe.component.html',
  styleUrls: ['./adminMarca-detalhe.component.scss']
})
export class AdminMarcaDetalheComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  marca = {} as Marca;

  marcaId: number;
  estado = 'post';

  estadoBtn: boolean = false;

  get f(): any {
    return this.form.controls;
  }

  //Ele so cria um lote se ja existir um evento
  get modoEditar(): boolean {
    return this.estado === 'put';
  }

  constructor(
    private formBuilder:FormBuilder,
    private ActivatedRouter: ActivatedRoute,
    private marcaService: MarcaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.carregarMarca();
    this.validation();
  }

  public validation():void {

    this.form = this.formBuilder.group(
      {
        marcaNome: ['',[Validators.required]]
      }
    );
  }


  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched };
  }

  public carregarMarca(): void {
    this.marcaId = +this.ActivatedRouter.snapshot.paramMap.get('id');

    if (this.marcaId !== null && this.marcaId !== 0) {
      this.spinner.show();
      this.estado ='put'; // Carregamos os eventos quando estamos a editar
      this.marcaService.getMarcaById(this.marcaId).subscribe(
        (marca: Marca) => {
         //Eu pego cada uma das propriedades dentro do meu objecto evento que eu recebi do meu getEventobyId
         this.marca =  {...marca};
         this.form.patchValue(this.marca);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar a marca.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  public guardarMarca(): void {
    this.spinner.show();
    if (this.form.valid) {

      if(this.estado === 'post'){
        this.marca =  {...this.form.value}; //Todos os campos do formulario

        this.marcaService.postMarca(this.marca).subscribe({
          next: (marcaRetorno: Marca) => {
            //admin/detalhe/1
            this.router.navigate([`admin/marca/detalhe/${marcaRetorno.marcaId}`]);
            this.toastr.success('Marca guardada com Sucesso!', 'Sucesso');
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao guardar a marca', 'Erro');
          },
          complete: () => this.spinner.hide()
        });

      }else{
        this.marca =  {marcaId: this.marca.marcaId , ...this.form.value}; //Todos os campos do formulario

        this.marcaService.putMarca(this.marca.marcaId, this.marca).subscribe({
          next: () => this.toastr.success('Marca Atualizada com Sucesso!', 'Sucesso'),
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar Atualizar a Marca', 'Erro');
          },
          complete: () => this.spinner.hide()
        }).add(() => this.spinner.hide());
      }
    }
  }

}
