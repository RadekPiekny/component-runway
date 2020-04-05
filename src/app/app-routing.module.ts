
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { EqualizerComponent } from './component/equalizer/equalizer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equalizer', component: EqualizerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
