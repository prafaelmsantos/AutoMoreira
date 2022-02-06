import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VeiculoService } from './services/veiculo.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CarouselConfig, CarouselModule } from 'ngx-bootstrap/carousel';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner'

import { NavComponent } from './shared/nav/nav.component';
import { TituloComponent } from './shared/titulo/titulo.component';
import { RodapeComponent } from './shared/rodape/rodape.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { MarcasComponent } from './components/marcas/marcas.component';
import { ModelosComponent } from './components/modelos/modelos.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AdminVeiculoDetalheComponent } from './components/admin/adminVeiculo-detalhe/adminVeiculo-detalhe.component';
import { AdminVeiculoListaComponent } from './components/admin/adminVeiculo-lista/adminVeiculo-lista.component';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';

defineLocale('pt-br', ptBrLocale);

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
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AdminVeiculoDetalheComponent,
    AdminVeiculoListaComponent,
    DateTimeFormatPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Rafael
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    CarouselModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true
    }),
    NgxSpinnerModule,
    ButtonsModule.forRoot(),

  ],
  providers: [
    VeiculoService,
    { provide: CarouselConfig, useValue: { interval: 3500, noPause: true, showIndicators: true } }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
