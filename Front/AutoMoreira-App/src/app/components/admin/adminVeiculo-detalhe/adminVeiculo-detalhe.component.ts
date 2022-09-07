import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Modelo } from 'src/app/models/Modelo';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo/veiculo.service';
import { environment } from 'src/environments/environment';
import { MarcaService } from '@app/services/marca/marca.service';
import { ModeloService } from '@app/services/modelo/modelo.service';

@Component({
  selector: 'app-adminVeiculo-detalhe',
  templateUrl: './adminVeiculo-detalhe.component.html',
  styleUrls: ['./adminVeiculo-detalhe.component.css']
})
export class AdminVeiculoDetalheComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  veiculo = {} as Veiculo;

  marcas: Marca[] = [];
  modelos: Modelo[] = [];

  imagemURL = 'assets/img/upload.png';
  file: File;
  veiculoId: number;
  estado = 'post';

  estadoBtn: boolean = false;

  tiposCombustivel = [
    { nome: "Diesel", value: "Diesel" },
    { nome: "Gasolina", value: "Gasolina" },
    { nome: "Hibrido", value: "Hibrido" }
  ]


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
    private veiculoService: VeiculoService,
    private marcaService: MarcaService,
    private modeloService: ModeloService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private http: HttpClient) { }

  ngOnInit() {

    this.carregarVeiculo();
    this.validation();
    this.carregarMarcas();
    this.carregarModelos();
  }

  public validation():void {

    this.form = this.formBuilder.group(
      {
        marcaId: ['',[Validators.required]],
        modeloId: ['',Validators.required],
        ano: ['',Validators.required],
        cor: ['',Validators.required],
        preco: ['',[Validators.required]],
        combustivel: ['',Validators.required],
        versao: ['',[Validators.required]],
        observacoes: ['',[Validators.required]],
        numeroPortas: ['',[Validators.required]],
        transmissao: ['',[Validators.required]],
        cilindrada: ['',[Validators.required]],
        potencia: ['',[Validators.required]],
        novidade: ['',[Validators.required]],
        imagemURL: [''],
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

  public carregarVeiculo(): void {
    this.veiculoId = +this.ActivatedRouter.snapshot.paramMap.get('id');

    if (this.veiculoId !== null && this.veiculoId !== 0) {
      this.spinner.show();
      this.estado ='put'; // Carregamos os eventos quando estamos a editar
      this.veiculoService.getVeiculoById(this.veiculoId).subscribe(
        (veiculo: Veiculo) => {
         //Eu pego cada uma das propriedades dentro do meu objecto evento que eu recebi do meu getEventobyId
         this.veiculo =  {...veiculo};
         this.form.patchValue(this.veiculo);

         if (this.veiculo.imagemURL !== '') {
          this.imagemURL = environment.apiURL + 'resources/images/' + this.veiculo.imagemURL;
        }

        },
        (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar o veiculo!', 'Erro!');
          console.error(error);
        },
        () => this.spinner.hide(),
      );
    }
  }

  public guardarVeiculo(): void {
    this.spinner.show();
    if (this.form.valid) {

      if(this.estado === 'post'){
        this.veiculo =  {...this.form.value}; //Todos os campos do formulario

        this.veiculoService.postVeiculo(this.veiculo).subscribe({
          next: (veiculoRetorno: Veiculo) => {
            //admin/detalhe/1
            this.router.navigate([`admin/veiculo/detalhe/${veiculoRetorno.veiculoId}`]);
            this.toastr.success('Veiculo guardado com sucesso!', 'Sucesso');
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao guardar o veiculo!', 'Erro');
          },
          complete: () => this.spinner.hide()
        });

      }else{
        this.veiculo =  {veiculoId: this.veiculo.veiculoId , ...this.form.value}; //Todos os campos do formulario

        this.veiculoService.putVeiculo(this.veiculo.veiculoId,this.veiculo).subscribe({
          next: () => this.toastr.success('Veiculo atualizado com sucesso!', 'Sucesso'),
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar atualizar o veiculo!', 'Erro');
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

  public carregarModelos(): void {

    //Vou fazer um get do protocolo http neste URL
    this.modeloService.getModelos().subscribe({
      next: (_modelos: Modelo[]) => {
        this.modelos = _modelos;
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os Modelos!', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }

  onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => this.imagemURL = event.target.result;

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    this.estadoBtn = true;

    //this.uploadImagem();
  }
 // Atualizar no BackEnd
  uploadImagem(): void {
    this.spinner.show();
    this.veiculoService.postUpload(this.veiculoId, this.file).subscribe(
      () => {
        this.carregarVeiculo();
        this.toastr.success('Imagem atualizada com sucesso!', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem!', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

}
