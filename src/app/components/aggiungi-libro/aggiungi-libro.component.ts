import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {LibroService} from "../../services/libro.service";
import {MessaggioResponse} from "../../dtos/response/MessaggioResponse";
import {GenereService} from "../../services/genere.service";
import {GenereResponse} from "../../dtos/response/GenereResponse";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-aggiungi-libro',
  templateUrl: './aggiungi-libro.component.html',
  styleUrl: './aggiungi-libro.component.css'
})
export class AggiungiLibroComponent implements OnInit {

  protected titolo: string = '';
  protected autore: string = '';
  protected anno: number = 0;
  protected descrizione: string = '';
  protected genereSelected: string = '';
  protected isbn: string = '';
  protected generi: GenereResponse[] = [];

  constructor(private router: Router, private libroService: LibroService, private genereService: GenereService) { }

  ngOnInit(): void {
    this.genereService.getAll().subscribe({
      next: (res: GenereResponse[]) => {
        this.generi = res;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  aggiungi(): void {
    this.libroService.aggiungi({titolo: this.titolo, autore: this.autore, anno: this.anno,
      descrizione: this.descrizione, genere: this.genereSelected}).subscribe({
      next: (res: MessaggioResponse) => {
        this.router.navigateByUrl('/homepage');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  cercaConIsbn(): void {
    this.isbn = this.isbn.replace(/-/g, '');
    this.libroService.cercaConIsbn(this.isbn).subscribe({
      next: (res: any) => {
        console.log(res['ISBN:' + this.isbn]);
        this.titolo = res['ISBN:' + this.isbn].title;
        this.autore = res['ISBN:' + this.isbn].authors[0].name;
        this.anno = res['ISBN:' + this.isbn].publish_date;
        this.descrizione = res['ISBN:' + this.isbn].subtitle;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
    }

  goToHomepage(): void {
    this.router.navigateByUrl('/homepage');
  }
}
