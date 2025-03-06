import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessaggioResponse} from "../dtos/response/MessaggioResponse";
import {ScambioRequest} from "../dtos/request/ScambioRequest";
import {OffertaResponse} from "../dtos/response/OffertaResponse";

@Injectable({
  providedIn: 'root'
})
export class ScambioService {

  private backendUrl: string = globalBackendUrl + 'scambio/';

  constructor(private http: HttpClient) {
  }

  inScambio(idLibro: string, modalitaScambio: string, libroIdSelezionato: number): Observable<MessaggioResponse> {
    const request: ScambioRequest = { proprietarioId: Number(localStorage.getItem('userId')) || 0,
      modalitaScambio: modalitaScambio, libroId: Number(idLibro) || 0, libroIdRichiedente: libroIdSelezionato};
    return this.http.post<MessaggioResponse>
    (this.backendUrl + 'inScambio', request, {headers: this.getHeader()});
  }

  inPrestito(idLibro: string): Observable<MessaggioResponse> {
    const request: ScambioRequest = { proprietarioId: Number(localStorage.getItem('userId')) || 0,
      modalitaScambio: '', libroId: Number(idLibro) || 0, libroIdRichiedente: 0};
    return this.http.post<MessaggioResponse>
    (this.backendUrl + 'inPrestito', request, {headers: this.getHeader()});
  }

  getOfferte(): Observable<OffertaResponse[]> {
    return this.http.get<OffertaResponse[]>(this.backendUrl + 'getOfferte/' + localStorage.getItem('userId') || '0', {headers: this.getHeader()});
  }

  ottieni(scambioId: number): Observable<MessaggioResponse> {
    return this.http.get<MessaggioResponse>
    (this.backendUrl + 'ottieni/' + scambioId + '/' + localStorage.getItem('userId') || '0',
      {headers: this.getHeader()});
  }

  getPropriScambi(): Observable<OffertaResponse[]> {
    return this.http.get<OffertaResponse[]>(this.backendUrl + 'getPropriScambi/' + localStorage.getItem('userId') || '0',
      {headers: this.getHeader()});
  }

  richiediInPrestito(libroIdRichiesto: number, modalita: string): Observable<MessaggioResponse> {
    const request: ScambioRequest = { proprietarioId: Number(localStorage.getItem('userId')) || 0,
      modalitaScambio: modalita, libroId: libroIdRichiesto, libroIdRichiedente: 0};
    return this.http.post<MessaggioResponse>(this.backendUrl + 'richiediInPrestito', request, {headers: this.getHeader()});
  }

  richiediPerScambio(libroIdRichiesto: number, libroIdProposto: number, modalita: string): Observable<MessaggioResponse> {
    const request: ScambioRequest = { proprietarioId: Number(localStorage.getItem('userId')) || 0,
      modalitaScambio: modalita, libroId: libroIdRichiesto, libroIdRichiedente: libroIdProposto};
    return this.http.post<MessaggioResponse>(this.backendUrl + 'richiediPerScambio', request, {headers: this.getHeader()});
  }

  getProprieRichieste(): Observable<OffertaResponse[]> {
    return this.http.get<OffertaResponse[]>
    (this.backendUrl + 'getProprieRichieste/' + localStorage.getItem('userId') || '0',
      {headers: this.getHeader()});
  }

  accettaRichiesta(scambioId: number): Observable<MessaggioResponse> {
    return this.http.get<MessaggioResponse>
    (this.backendUrl + 'accettaRichiesta/' + scambioId, {headers: this.getHeader()});
  }

  rifiutaRichiesta(scambioId: number): Observable<MessaggioResponse> {
    return this.http.delete<MessaggioResponse>
    (this.backendUrl + 'rifiutaRichiesta/' + scambioId, {headers: this.getHeader()});
  }

  getOfferteConcluse(): Observable<OffertaResponse[]> {
    return this.http.get<OffertaResponse[]>
    (this.backendUrl + 'getOfferteConcluse/' + localStorage.getItem('userId') || '0', {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
