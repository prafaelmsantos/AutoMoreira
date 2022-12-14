import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { AdminComponent } from './components/admin/admin.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AdminVeiculoDetalheComponent } from './components/admin/adminVeiculo-detalhe/adminVeiculo-detalhe.component';
import { AdminVeiculoListaComponent } from './components/admin/adminVeiculo-lista/adminVeiculo-lista.component';
import { AdminHomeComponent } from './components/admin/adminHome/adminHome.component';
import { AdminMarcaListaComponent } from './components/admin/adminMarca-lista/adminMarca-lista.component';
import { AdminMarcaDetalheComponent } from './components/admin/adminMarca-detalhe/adminMarca-detalhe.component';
import { AdminModeloListaComponent } from './components/admin/adminModelo-lista/adminModelo-lista.component';
import { AdminModeloDetalheComponent } from './components/admin/adminModelo-detalhe/adminModelo-detalhe.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { AdminContactoListaComponent } from './components/admin/adminContacto-lista/adminContacto-lista.component';



const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full' },

  { //Todos os filhos tem de ser autenticados
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'user', redirectTo: 'user/perfil' },
      { path: 'user/perfil', component: PerfilComponent },
      { path: 'admin', redirectTo:'admin/home'},
      {
        path: 'admin', component: AdminComponent,
        children: [
          { path: 'veiculo/detalhe/:id', component: AdminVeiculoDetalheComponent },
          { path: 'veiculo/detalhe', component: AdminVeiculoDetalheComponent },
          { path: 'veiculo/lista', component: AdminVeiculoListaComponent },
          { path: 'marca/lista', component: AdminMarcaListaComponent },
          { path: 'marca/detalhe/:id', component: AdminMarcaDetalheComponent },
          { path: 'marca/detalhe', component: AdminMarcaDetalheComponent },
          { path: 'modelo/lista', component: AdminModeloListaComponent },
          { path: 'modelo/detalhe/:id', component: AdminModeloDetalheComponent },
          { path: 'modelo/detalhe', component: AdminModeloDetalheComponent },
          { path: 'home', component: AdminHomeComponent },
          { path: 'contacto/lista', component: AdminContactoListaComponent },
        ]
      },
    ]
  },
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },

    ]
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
  {path: 'home', component: HomeComponent},
  {path: 'sobre', component: SobreComponent},
  {path: 'contactos', component: ContactosComponent},
  {path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
