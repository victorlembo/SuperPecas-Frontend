import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarrosComponent } from './carros/carros.component';
import { PecasComponent } from './pecas/pecas.component'; 
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'carros', component: CarrosComponent },
  { path: 'pecas', component: PecasComponent }, 
  { path: 'home', component: HomeComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
