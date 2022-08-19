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

@Component({
  selector: 'app-adminVeiculo-detalhe',
  templateUrl: './adminVeiculo-detalhe.component.html',
  styleUrls: ['./adminVeiculo-detalhe.component.css']
})
export class AdminVeiculoDetalheComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  veiculo = {} as Veiculo;

  public marcas: any = [];
  public modelos: any = [];

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
          this.toastr.error('Erro ao tentar carregar o veiculo.', 'Erro!');
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
            this.router.navigate([`admin/detalhe/${veiculoRetorno.veiculoId}`]);
            this.toastr.success('veiculo guardado com Sucesso!', 'Sucesso');
          },
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao guardar o veiculo', 'Erro');
          },
          complete: () => this.spinner.hide()
        });

      }else{
        this.veiculo =  {veiculoId: this.veiculo.veiculoId , ...this.form.value}; //Todos os campos do formulario

        this.veiculoService.putVeiculo(this.veiculo.veiculoId,this.veiculo).subscribe({
          next: () => this.toastr.success('Veiculo Atualizado com Sucesso!', 'Sucesso'),
          error: (error: any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error('Erro ao tentar Atualizar o veiculo', 'Erro');
          },
          complete: () => this.spinner.hide()
        }).add(() => this.spinner.hide());
      }
    }
  }



  public carregarMarcas(): void {
    this.http.get('https://localhost:5001/api/marcas').subscribe(
      response => {
        this.marcas = response;
      },
      error => console.log(error)
    );
  }

  public carregarModelos(): void {
    this.http.get('https://localhost:5001/api/modelos').subscribe(
      response => {
        this.modelos = response;
      },
      error => console.log(error)
    );
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
        this.toastr.success('Imagem atualizada com Sucesso', 'Sucesso!');
      },
      (error: any) => {
        this.toastr.error('Erro ao fazer upload de imagem', 'Erro!');
        console.log(error);
      }
    ).add(() => this.spinner.hide());
  }

}
