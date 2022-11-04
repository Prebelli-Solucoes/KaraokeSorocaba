import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './templates/home/home.component';

import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';

import { NgxScrollTopModule } from 'ngx-scrolltop';

import { ListaComponent } from './templates/lista/lista.component';
import { NacionaisComponent } from './templates/nacionais/nacionais.component';
import { InglesComponent } from './templates/ingles/ingles.component';
import { ItalianoComponent } from './templates/italiano/italiano.component';
import { EspanholComponent } from './templates/espanhol/espanhol.component';
import { GospelComponent } from './templates/gospel/gospel.component';
import { InfantilComponent } from './templates/infantil/infantil.component';
import { BuscaComponent } from './templates/busca/busca.component';
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
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    MatExpansionModule,
    NgxScrollTopModule,
    MatInputModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
