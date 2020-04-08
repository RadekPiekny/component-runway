import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EqualizerComponent } from './component/equalizer/equalizer.component';
import { HomeComponent } from './view/home/home.component';
import { PlayButtonComponent } from './component/play-button/play-button.component';
import { StopButtonComponent } from './component/stop-button/stop-button.component';
import { RunwayComponent } from './view/runway/runway.component';

@NgModule({
  declarations: [
    AppComponent,
    EqualizerComponent,
    HomeComponent,
    PlayButtonComponent,
    StopButtonComponent,
    RunwayComponent
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
