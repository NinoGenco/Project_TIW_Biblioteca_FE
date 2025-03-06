import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

  constructor(private router: Router) { }

  goToModificaUtente(): void {
    this.router.navigateByUrl('/modificaUtente/' + localStorage.getItem('userId') || '0');
  }

  goToUtentiGlobali(): void {
    this.router.navigateByUrl('/utentiGlobali');
  }

  goToAggiungiLibro(): void {
    this.router.navigateByUrl('/aggiungiLibro');
  }

  goToLibriGlobali(): void {
    this.router.navigateByUrl('/libriGlobali');
  }

  goToPropriLibri(): void {
    this.router.navigateByUrl('/propriLibri/' + localStorage.getItem('userId') || '0');
  }

  goToOfferte(): void {
    this.router.navigateByUrl('/offerte');
  }

  goToPropriScambi(): void {
    this.router.navigateByUrl('/propriScambi/' + localStorage.getItem('userId') || '0');
  }

  goToProprieRichieste(): void {
    this.router.navigateByUrl('/proprieRichieste');
  }

  goToOfferteConcluse(): void {
    this.router.navigateByUrl('/offerteConcluse');
  }

  goToNotifica(): void {
    this.router.navigateByUrl('/notifica');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
