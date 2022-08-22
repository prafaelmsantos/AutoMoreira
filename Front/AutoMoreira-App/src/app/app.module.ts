import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { VeiculoService } from './services/veiculo/veiculo.service';
import { MarcaService } from './services/marca/marca.service';
import { UserService } from './services/user/user.service';

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
import { RodapeComponent } from './shared/rodape/rodape.component';
import { VeiculosComponent } from './components/veiculos/veiculos.component';
import { ContactosComponent } from './components/contactos/contactos.component';
import { PerfilComponent } from './components/user/perfil/perfil.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { VeiculoDetalheComponent } from './components/veiculos/veiculo-detalhe/veiculo-detalhe.component';
import { VeiculoListaComponent } from './components/veiculos/veiculo-lista/veiculo-lista.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { AdminVeiculoDetalheComponent } from './components/admin/adminVeiculo-detalhe/adminVeiculo-detalhe.component';
import { AdminVeiculoListaComponent } from './components/admin/adminVeiculo-lista/adminVeiculo-lista.component';
import { DateTimeFormatPipe } from './helpers/DateTimeFormat.pipe';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ScrollToTopComponent } from './shared/scrollToTop/scrollToTop.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { AdminHomeComponent } from './components/admin/adminHome/adminHome.component';
import { AdminMarcaListaComponent } from './components/admin/adminMarca-lista/adminMarca-lista.component';
import { AdminMarcaDetalheComponent } from './components/admin/adminMarca-detalhe/adminMarca-detalhe.component';
import { AdminModeloListaComponent } from './components/admin/adminModelo-lista/adminModelo-lista.component';
import { ModeloService } from './services/modelo/modelo.service';
import { AdminModeloDetalheComponent } from './components/admin/adminModelo-detalhe/adminModelo-detalhe.component';



defineLocale('pt-br', ptBrLocale);

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    VeiculosComponent,
    ContactosComponent,
    PerfilComponent,
    InicioComponent,
    SobreComponent,
    RodapeComponent,
    VeiculoDetalheComponent,
    VeiculoListaComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    RegistrationComponent,
    AdminVeiculoDetalheComponent,
    AdminVeiculoListaComponent,
    DateTimeFormatPipe,
    ScrollToTopComponent,
    SidebarComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminMarcaListaComponent,
    AdminMarcaDetalheComponent,
    AdminModeloListaComponent,
    AdminModeloDetalheComponent

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
    MarcaService,
    ModeloService,
    UserService,
    { provide: CarouselConfig, useValue: { interval: 3500, noPause: true, showIndicators: true } },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

