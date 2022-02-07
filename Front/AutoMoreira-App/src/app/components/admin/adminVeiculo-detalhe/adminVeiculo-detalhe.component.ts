import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Marca } from 'src/app/models/Marca';
import { Modelo } from 'src/app/models/Modelo';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';

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


  estado = 'post';

  tiposCombustivel = [
    { nome: "Diesel", value: "Diesel" },
    { nome: "Gasolina", value: "Gasolina" },
    { nome: "Hibrido", value: "Hibrido" }
  ]


  get f(): any {
    return this.form.controls;
  }

  constructor(private formBuilder:FormBuilder, private router: ActivatedRoute,
    private veiculoService: VeiculoService, private spinner: NgxSpinnerService,
    private toastr: ToastrService,private http: HttpClient) { }



    public carregarVeiculo(): void {
      const veiculoIdParam = this.router.snapshot.paramMap.get('id');

      if (veiculoIdParam !== null) {
        this.spinner.show();
        this.estado ='put'; // Carregamos os eventos quando estamos a editar
        this.veiculoService.getVeiculoById(+veiculoIdParam).subscribe(
          (veiculo: Veiculo) => {
           //Eu pego cada uma das propriedades dentro do meu objecto evento que eu recebi do meu getEventobyId
           this.veiculo =  {...veiculo};
           this.form.patchValue(this.veiculo);

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
        imagemURL: ['',Validators.required],
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

  public guardarAlteracao(): void {
    this.spinner.show();
    if (this.form.valid) {

      if(this.estado === 'post'){
        this.veiculo =  {...this.form.value}; //Todos os campos do formulario

        this.veiculoService.postVeiculo(this.veiculo).subscribe({
          next: () => this.toastr.success('veiculo guardado com Sucesso!', 'Sucesso'),
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


}
