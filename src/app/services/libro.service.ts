import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessaggioResponse} from "../dtos/response/MessaggioResponse";
import {AggiungiLibroRequest} from "../dtos/request/AggiungiLibroRequest";
import {LibroResponse} from "../dtos/response/LibroResponse";

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private backendUrl: string = globalBackendUrl + 'libro/';

  constructor(private http: HttpClient) {
  }

  aggiungi(request: AggiungiLibroRequest): Observable<MessaggioResponse> {
    return this.http.post<MessaggioResponse>
    (this.backendUrl + 'aggiungi/' + localStorage.getItem('userId') || '0', request, {headers: this.getHeader()});
  }

  cercaConIsbn(isbn: string): Observable<any> {
    return this.http.get<any>('https://openlibrary.org/api/books?bibkeys=ISBN:' + isbn + '&format=json&jscmd=data');
  }

  getAll(): Observable<LibroResponse[]> {
    return this.http.get<LibroResponse[]>(this.backendUrl + 'getAll/' + localStorage.getItem('userId') || '0', {headers: this.getHeader()});
  }

  getByProprietario(): Observable<LibroResponse[]> {
    return this.http.get<LibroResponse[]>(this.backendUrl + 'getByProprietario/' + localStorage.getItem('userId') || '0', {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
