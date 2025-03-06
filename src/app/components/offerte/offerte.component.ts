import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {HttpErrorResponse} from "@angular/common/http";
import {OffertaResponse} from "../../dtos/response/OffertaResponse";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";

@Component({
  selector: 'app-offerte',
  templateUrl: './offerte.component.html',
  styleUrl: './offerte.component.css'
})
export class OfferteComponent implements OnInit {

  protected ricercaTitolo: string = '';
  protected ricercaAutore: string = '';
  protected offerte: OffertaResponse[] = [];

  constructor(private router: Router, private scambioService: ScambioService) { }

  ngOnInit(): void {
    this.scambioService.getOfferte().subscribe({
      next: (response: OffertaResponse[]) => {
        this.offerte = response;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  ottieni(scambioId: number): void {
    this.scambioService.ottieni(scambioId).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      }
    });
  }

  resetFiltri(): void {
    this.ricercaTitolo = '';
    this.ricercaAutore = '';
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
