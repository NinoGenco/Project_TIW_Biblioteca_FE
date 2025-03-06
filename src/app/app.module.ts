import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ModificaUtenteComponent } from './components/modifica-utente/modifica-utente.component';
import { UtentiGlobaliComponent } from './components/utenti-globali/utenti-globali.component';
import { ChatComponent } from './components/chat/chat.component';
import { AggiungiLibroComponent } from './components/aggiungi-libro/aggiungi-libro.component';
import { LibriGlobaliComponent } from './components/libri-globali/libri-globali.component';
import { OffertaComponent } from './components/offerta/offerta.component';
import { PropriLibriComponent } from './components/propri-libri/propri-libri.component';
import { OfferteComponent } from './components/offerte/offerte.component';
import { TuoiScambiComponent } from './components/tuoi-scambi/tuoi-scambi.component';
import { RichiestaComponent } from './components/richiesta/richiesta.component';
import { ProprieRichiesteComponent } from './components/proprie-richieste/proprie-richieste.component';
import { OfferteConcluseComponent } from './components/offerte-concluse/offerte-concluse.component';
import { RecensioneComponent } from './components/recensione/recensione.component';
import { NotificaComponent } from './components/notifica/notifica.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomepageComponent,
    ModificaUtenteComponent,
    UtentiGlobaliComponent,
    ChatComponent,
    AggiungiLibroComponent,
    LibriGlobaliComponent,
    OffertaComponent,
    PropriLibriComponent,
    OfferteComponent,
    TuoiScambiComponent,
    RichiestaComponent,
    ProprieRichiesteComponent,
    OfferteConcluseComponent,
    RecensioneComponent,
    NotificaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
