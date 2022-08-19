import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { ModelosComponent } from './components/modelos/modelos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { AdminComponent } from './components/admin/admin.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { AdminVeiculoDetalheComponent } from './components/admin/adminVeiculo-detalhe/adminVeiculo-detalhe.component';
import { AdminVeiculoListaComponent } from './components/admin/adminVeiculo-lista/adminVeiculo-lista.component';



const routes: Routes = [
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
  {
    path: 'user/perfil', component: PerfilComponent
  },
  {path: 'veiculos', redirectTo:'veiculos/lista'},
  {
    path: 'veiculos', component: VeiculosComponent,
    children: [
      //{ path: 'detalhe/:veiculoId/:marcaId/:modeloId', component: VeiculoDetalheComponent},
      { path: 'detalhe/:id', component: VeiculoDetalheComponent},
      { path: 'detalhe', component: VeiculoDetalheComponent },
      { path: 'lista', component: VeiculoListaComponent },
    ]
  },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'detalhe/:id', component: AdminVeiculoDetalheComponent },
      { path: 'detalhe', component: AdminVeiculoDetalheComponent },
      { path: 'lista', component: AdminVeiculoListaComponent },
    ]
  },
  {path: 'inicio', component: InicioComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: 'marcas', component: MarcasComponent},
  {path: 'modelos', component: ModelosComponent},
  {path: '', redirectTo: 'inicio', pathMatch: 'full' },
  {path: '**', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
