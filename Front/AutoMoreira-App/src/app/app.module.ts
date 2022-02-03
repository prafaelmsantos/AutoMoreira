import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './shared/nav/nav.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { RodapeComponent } from './shared/rodape/rodape.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { ModelosComponent } from './components/modelos/modelos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { VeiculoService } from './services/veiculo.service';

import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { AdminComponent } from './components/admin/admin.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AdminVeiculoDetalheComponent } from './components/admin/adminVeiculo-detalhe/adminVeiculo-detalhe.component';
import { AdminVeiculoListaComponent } from './components/admin/adminVeiculo-lista/adminVeiculo-lista.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';





@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VeiculosComponent,
    ContactosComponent,
    PerfilComponent,
    TituloComponent,
    InicioComponent,
    SobreComponent,
    RodapeComponent,
    MarcasComponent,
    ModelosComponent,
    VeiculoDetalheComponent,
    VeiculoListaComponent,
    AdminComponent,
    DateTimeFormatPipe,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AdminVeiculoDetalheComponent,
    AdminVeiculoListaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Rafael
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    ButtonsModule.forRoot(),


  ],
  providers: [
    VeiculoService,
    { provide: CarouselConfig, useValue: { interval: 3500, noPause: true, showIndicators: true } }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
