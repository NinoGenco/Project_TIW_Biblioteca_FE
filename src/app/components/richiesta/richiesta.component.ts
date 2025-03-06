import {Component, OnInit} from '@angular/core';
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ScambioService} from "../../services/scambio.service";
import {LibroResponse} from "../../dtos/response/LibroResponse";
import {LibroService} from "../../services/libro.service";

@Component({
  selector: 'app-richiesta',
  templateUrl: './richiesta.component.html',
  styleUrl: './richiesta.component.css'
})
export class RichiestaComponent implements OnInit {

  protected modalita: string = '';
  protected isPrestito: boolean = true;
  protected libroIdSelezionato: number = 0;
  protected libri: LibroResponse[] = [];
  protected libroId: number = Number(this.router.url.split('/')[2]);

  constructor(private router: Router, private scambioService: ScambioService, private libroService: LibroService) { }

  ngOnInit(): void {
    this.libroService.getByProprietario().subscribe({
      next: (res: LibroResponse[]) => {
        this.libri = res;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  richiediInPrestito(): void {
    this.scambioService.richiediInPrestito(this.libroId, this.modalita).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    });
  }

  richiediPerScambio(): void {
    this.scambioService.richiediPerScambio(this.libroId, this.libroIdSelezionato, this.modalita).subscribe({
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
