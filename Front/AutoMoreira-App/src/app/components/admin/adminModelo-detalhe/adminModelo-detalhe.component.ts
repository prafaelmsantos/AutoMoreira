import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from '@app/models/Marca';
import { Modelo } from '@app/models/Modelo';
import { MarcaService } from '@app/services/marca/marca.service';
import { ModeloService } from '@app/services/modelo/modelo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adminModelo-detalhe',
  templateUrl: './adminModelo-detalhe.component.html',
  styleUrls: ['./adminModelo-detalhe.component.scss']
})
export class AdminModeloDetalheComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  modelo = {} as Modelo;
  marcas: Marca[] = [];

  modeloId: number;
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
    private modeloService: ModeloService,
    private marcaService: MarcaService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.carregarModelo();
    this.carregarMarcas();
    this.validation();
  }

  public validation():void {

    this.form = this.formBuilder.group(
      {
        modeloNome: ['',[Validators.required]],
        marcaId: ['',[Validators.required]]
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

  public carregarModelo(): void {
    this.modeloId = +this.ActivatedRouter.snapshot.paramMap.get('id');

    if (this.modeloId !== null && this.modeloId !== 0) {
      this.spinner.show();
      this.estado ='put'; // Carregamos os eventos quando estamos a editar
      this.modeloService.getModeloById(this.modeloId).subscribe(
        (modelo: Modelo) => {
         //Eu pego cada uma das propriedades dentro do meu objecto evento que eu recebi do meu getEventobyId
         this.modelo =  {...modelo};
         this.form.patchValue(this.modelo);
        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar o Modelo.', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  public guardarModelo(): void {
    this.spinner.show();
    if (this.form.valid) {

      if(this.estado === 'post'){
        this.modelo =  {...this.form.value}; //Todos os campos do formulario

        this.modeloService.postModelo(this.modelo).subscribe({
          next: (modeloRetorno: Modelo) => {
            //admin/detalhe/1
            this.router.navigate([`admin/modelo/detalhe/${modeloRetorno.modeloId}`]);
            this.toastr.success('Modelo guardado com sucesso!', 'Sucesso');
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao guardar o Modelo!', 'Erro');
          },
          complete: () => this.spinner.hide()
        });

      }else{
        this.modelo =  {modeloId: this.modelo.modeloId , ...this.form.value}; //Todos os campos do formulario

        this.modeloService.putModelo(this.modelo.modeloId, this.modelo).subscribe({
          next: () => this.toastr.success('Modelo atualizado com sucesso!', 'Sucesso'),
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar atualizar o Modelo!', 'Erro');
          },
          complete: () => this.spinner.hide()
        }).add(() => this.spinner.hide());
      }
    }
  }

  public carregarMarcas(): void {
    //Vou fazer um get do protocolo http neste URL
    this.marcaService.getMarcas().subscribe({
      next: (_marcas: Marca[]) => {
        this.marcas = _marcas;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as Marcas!', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }


}
