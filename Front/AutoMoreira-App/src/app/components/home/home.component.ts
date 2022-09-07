import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Veiculo } from '@app/models/Veiculo';
import { VeiculoService } from '@app/services/veiculo/veiculo.service';
import { environment } from '@environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public veiculos: Veiculo[] = [];
  public veiculoId = 0;

  constructor(
    private veiculoService: VeiculoService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router) { }

  //ngOnInit é um metodo que vai ser
   //chamado antes de ser inicializado a aplicação. Antes do HTML ser interpretado
  public ngOnInit(): void {
    this.spinner.show();
    this.carregarVeiculosByNovidade();
  }

  public carregarVeiculosByNovidade(): void {
    //Vou fazer um get do protocolo http neste URL
    this.veiculoService.getVeiculoByNovidade().subscribe({
      next: (_veiculos: Veiculo[]) => {
        this.veiculos = _veiculos;
        console.log(this.veiculos);
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar as Novidades!', 'Erro!')

      },
      complete: () =>this.spinner.hide()

    });
  }
  detalheVeiculo(veiculoId: number): void{
    //this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
    this.router.navigate([`veiculos/detalhe/${veiculoId}`]);
  }

  public mostraImagem(imagemURL: string) : string {
    return imagemURL !== ''
    ? `${environment.apiURL}resources/images/${imagemURL}`
    : 'assets/img/imageNotAvailable.jpg';
   }

}
