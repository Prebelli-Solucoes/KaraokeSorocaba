import { EspanholComponent } from './templates/espanhol/espanhol.component';
import { InglesComponent } from './templates/ingles/ingles.component';
import { ItalianoComponent } from './templates/italiano/italiano.component';
import { NacionaisComponent } from './templates/nacionais/nacionais.component';
import { GospelComponent } from './templates/gospel/gospel.component';
import { InfantilComponent } from './templates/infantil/infantil.component';
import { ListaComponent } from './templates/lista/lista.component';
import { HomeComponent } from './templates/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuscaComponent } from './templates/busca/busca.component';
import { DownloadComponent } from './templates/download/download.component';

const routes: Routes = [{
  path: '',
  component: ListaComponent,
},
{
  path: 'lista',
  component: ListaComponent
},
{
path:'infantil',
component:InfantilComponent
},
{
  path: 'gospel',
  component: GospelComponent
},
{
  path:'nacionais',
  component:NacionaisComponent
},
{
  path:'italiano',
  component:ItalianoComponent
},
{
  path:'ingles',
  component: InglesComponent
},
{
  path: 'espanhol',
  component: EspanholComponent
},
{
  path: 'busca/:termo',
  component:BuscaComponent
},
{
  path: 'download',
  component: DownloadComponent,
  title: 'Baixar o aplicativo | Karaoke Sorocaba'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
