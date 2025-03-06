import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./components/register/register.component";
import {LoginComponent} from "./components/login/login.component";
import {HomepageComponent} from "./components/homepage/homepage.component";
import {ModificaUtenteComponent} from "./components/modifica-utente/modifica-utente.component";
import {UtentiGlobaliComponent} from "./components/utenti-globali/utenti-globali.component";
import {ChatComponent} from "./components/chat/chat.component";
import {AggiungiLibroComponent} from "./components/aggiungi-libro/aggiungi-libro.component";
import {LibriGlobaliComponent} from "./components/libri-globali/libri-globali.component";
import {OffertaComponent} from "./components/offerta/offerta.component";
import {PropriLibriComponent} from "./components/propri-libri/propri-libri.component";
import {OfferteComponent} from "./components/offerte/offerte.component";
import {TuoiScambiComponent} from "./components/tuoi-scambi/tuoi-scambi.component";
import {RichiestaComponent} from "./components/richiesta/richiesta.component";
import {ProprieRichiesteComponent} from "./components/proprie-richieste/proprie-richieste.component";
import {OfferteConcluseComponent} from "./components/offerte-concluse/offerte-concluse.component";
import {RecensioneComponent} from "./components/recensione/recensione.component";
import {NotificaComponent} from "./components/notifica/notifica.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "modificaUtente/:id", component: ModificaUtenteComponent },
  { path: "chat/:username", component: ChatComponent },
  { path: "utentiGlobali", component: UtentiGlobaliComponent },
  { path: "aggiungiLibro", component: AggiungiLibroComponent },
  { path: "libriGlobali", component: LibriGlobaliComponent },
  { path: "offerta/:id", component: OffertaComponent },
  { path: "propriLibri/:id", component: PropriLibriComponent },
  { path: "offerte", component: OfferteComponent },
  { path: "propriScambi/:id", component: TuoiScambiComponent },
  { path: "richiesta/:id", component: RichiestaComponent },
  { path: "proprieRichieste", component: ProprieRichiesteComponent },
  { path: "offerteConcluse", component: OfferteConcluseComponent },
  { path: "recensione/:id", component: RecensioneComponent },
  { path: "notifica", component: NotificaComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "**", redirectTo: "/login", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
