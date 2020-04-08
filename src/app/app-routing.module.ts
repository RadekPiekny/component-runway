
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { EqualizerComponent } from './component/equalizer/equalizer.component';
import { RunwayComponent } from './view/runway/runway.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'runway', component: RunwayComponent, children: [
    { path: 'equalizer', component: EqualizerComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
