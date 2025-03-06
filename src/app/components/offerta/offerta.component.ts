import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {LibroService} from "../../services/libro.service";
import {LibroResponse} from "../../dtos/response/LibroResponse";

@Component({
  selector: 'app-offerta',
  templateUrl: './offerta.component.html',
  styleUrl: './offerta.component.css'
})
export class OffertaComponent implements OnInit {

  protected modalitaScambio: string = '';
  protected isPrestito: boolean = true;
  protected libroIdSelezionato: number = 0;
  protected libri: LibroResponse[] = [];

  constructor(private router: Router, private scambioService: ScambioService, private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getAll().subscribe({
      next: (res: LibroResponse[]) => {
        this.libri = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  inScambio(): void {
    this.scambioService.inScambio
    (this.router.url.split('/')[2], this.modalitaScambio, this.libroIdSelezionato).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  inPrestito(): void {
    this.scambioService.inPrestito(this.router.url.split('/')[2]).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
