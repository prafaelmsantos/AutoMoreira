import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Veiculo } from 'src/app/models/Veiculo';
import { VeiculoService } from 'src/app/services/veiculo.service';

@Component({
  selector: 'app-veiculo-detalhe',
  templateUrl: './veiculo-detalhe.component.html',
  styleUrls: ['./veiculo-detalhe.component.css']
})
export class VeiculoDetalheComponent implements OnInit {

  veiculo = {} as Veiculo;

  constructor(private router: ActivatedRoute,
    private veiculoService: VeiculoService, private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.carregarVeiculo();
  }

  public carregarVeiculo(): void {
    const veiculoIdParam = this.router.snapshot.paramMap.get('id');

    if (veiculoIdParam !== null) {
      this.spinner.show();

      this.veiculoService.getVeiculoById(+veiculoIdParam).subscribe({
        next: (veiculo: Veiculo) => {
          //Eu pego cada uma das propriedades dentro do meu objecto evento que eu recebi do meu getVeiculobyId
          this.veiculo = {...veiculo};

        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar o veiculo.', 'Erro!');
          console.error(error);
        },
        complete: () => this.spinner.hide(),
      });
    }
  }

  public mostrarImagem(imagemURL: string) : string {
    return imagemURL !== ''
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/imageNotAvailable.jpg';
   }

}
