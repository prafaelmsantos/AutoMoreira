import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  veiculo = {} as Veiculo;
  public veiculos: Veiculo[] = [];

  public marcas: any = [];
  public modelos: any = [];



  form: FormGroup = this.formBuilder.group({});

  get f(): any {
    return this.form.controls;

  }

  constructor(private formBuilder:FormBuilder, private router: ActivatedRoute,
    private veiculoService: VeiculoService, private spinner: NgxSpinnerService,
    private toastr: ToastrService,private http: HttpClient) { }

  ngOnInit() {

    this.carregarVeiculo();
    this.validation();
    this.getMarcas();
    this.getModelos();


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

  onSubmit(): void {

    // Vai parar aqui se o form estiver inválido
    if (this.form.invalid) {
      return;
    }

  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }

  public carregarVeiculo(): void {
    const veiculoIdParam = this.router.snapshot.paramMap.get('veiculoId');

    if (veiculoIdParam !== null) {
      this.spinner.show();

      this.veiculoService.getVeiculoById(+veiculoIdParam).subscribe(
        (veiculo: Veiculo) => {
          this.veiculo = {...veiculo};

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

  public getMarcas(): void {
    this.http.get('https://localhost:5001/api/marcas').subscribe(
      response => {
        this.marcas = response;
      },
      error => console.log(error)
    );
  }

  public getModelos(): void {
    this.http.get('https://localhost:5001/api/modelos').subscribe(
      response => {
        this.modelos = response;
      },
      error => console.log(error)
    );
  }


}
