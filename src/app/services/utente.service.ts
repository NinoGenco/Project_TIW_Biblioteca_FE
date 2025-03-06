import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessaggioResponse} from "../dtos/response/MessaggioResponse";
import {ModificaUtenteRequest} from "../dtos/request/ModificaUtenteRequest";
import {UtenteResponse} from "../dtos/response/UtenteResponse";

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  private backendUrl: string = globalBackendUrl + 'utente/';

  constructor(private http: HttpClient) { }

  modifica(request: ModificaUtenteRequest): Observable<MessaggioResponse> {
    return this.http.put<MessaggioResponse>
    (this.backendUrl + 'modifica/' + localStorage.getItem('userId') || '', request, {headers: this.getHeader()});
  }

  get(): Observable<UtenteResponse> {
    return this.http.get<UtenteResponse>(this.backendUrl + 'get/' + localStorage.getItem('userId') || '', {headers: this.getHeader()});
  }

  getAll(): Observable<UtenteResponse[]> {
    return this.http.get<UtenteResponse[]>(this.backendUrl + 'getAll/' + localStorage.getItem('userId') || '', {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
