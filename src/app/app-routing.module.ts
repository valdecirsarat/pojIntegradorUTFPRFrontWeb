import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { GraficoComponent } from './grafico/grafico.component';
import { HomeComponent } from './home/home.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'grafico', component: GraficoComponent},
  {path:'home', component: HomeComponent},
  {path:'relatorio', component:RelatorioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
