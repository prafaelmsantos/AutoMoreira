import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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




}
