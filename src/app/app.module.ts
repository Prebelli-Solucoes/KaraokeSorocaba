import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './templates/home/home.component';

import { MatExpansionModule } from '@angular/material/expansion';

import { ListaComponent } from './templates/lista/lista.component';
import { NacionaisComponent } from './templates/nacionais/nacionais.component';
import { InglesComponent } from './templates/ingles/ingles.component';
import { ItalianoComponent } from './templates/italiano/italiano.component';
import { EspanholComponent } from './templates/espanhol/espanhol.component';
import { GospelComponent } from './templates/gospel/gospel.component';
import { InfantilComponent } from './templates/infantil/infantil.component';
import { BuscaComponent } from './templates/busca/busca.component';
import { DownloadComponent } from './templates/download/download.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListaComponent,
    NacionaisComponent,
    InglesComponent,
    ItalianoComponent,
    EspanholComponent,
    GospelComponent,
    InfantilComponent,
    BuscaComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatExpansionModule,
    FormsModule
  ],
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
