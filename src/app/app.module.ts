import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './view/home/home.component';
import { ButtonPlayComponent } from './component/button-play/button-play.component';
import { ButtonStopComponent } from './component/button-stop/button-stop.component';
import { RunwayComponent } from './view/runway/runway.component';
import { ButtonForwardComponent } from './component/button-forward/button-forward.component';
import { ButtonEjectComponent } from './component/button-eject/button-eject.component';
import { ButtonBackComponent } from './component/button-back/button-back.component';

import { EqualizerWaveComponent } from './component/equalizer/equalizer-wave/equalizer.component';
import { EqualizerBarComponent } from './component/equalizer/equalizer-bars/equalizer-bars.component';

@NgModule({
  declarations: [
    AppComponent,
    EqualizerWaveComponent,
    HomeComponent,
    ButtonPlayComponent,
    ButtonStopComponent,
    RunwayComponent,
    ButtonForwardComponent,
    ButtonEjectComponent,
    ButtonBackComponent,
    EqualizerBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
