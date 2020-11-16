
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { EqualizerWaveComponent } from './component/equalizer/equalizer-wave/equalizer.component';
import { RunwayComponent } from './view/runway/runway.component';
import { EqualizerBarComponent } from './component/equalizer/equalizer-bars/equalizer-bars.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'runway', component: RunwayComponent, children: [
    { path: 'equalizer-waves', component: EqualizerWaveComponent },
    { path: 'equalizer-bars', component: EqualizerBarComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
