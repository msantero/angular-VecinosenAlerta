import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Graficasv2Component } from './graficasv2/graficasv2.component';
import { Graficasv3Component } from './graficasv3/graficasv3.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/:id', component: DashboardComponent },
      //{ path: 'graficas', component: Graficasv2Component },
      //  { path: '', component: ProductListComponent },
      //  { path: 'product/:productId', component: ProductDetailComponent },
    ]),
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    Graficasv2Component,
    Graficasv3Component,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
