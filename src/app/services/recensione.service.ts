import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {globalBackendUrl} from "../utils/environment";
import {Observable} from "rxjs";
import {MessaggioResponse} from "../dtos/response/MessaggioResponse";
import {RecensioneRequest} from "../dtos/request/RecensioneRequest";
import {RecensioneResponse} from "../dtos/response/RecensioneResponse";

@Injectable({
  providedIn: 'root'
})
export class RecensioneService {

  private backendUrl: string = globalBackendUrl + 'recensione/';

  constructor(private http: HttpClient) {
  }

  invia(request: RecensioneRequest): Observable<MessaggioResponse> {
    return this.http.post<MessaggioResponse>
    (this.backendUrl + 'invia', request, {headers: this.getHeader()});
  }

  getByScambio(scambioId: string): Observable<RecensioneResponse[]> {
    return this.http.get<RecensioneResponse[]>
    (this.backendUrl + 'getByScambio/' + scambioId, {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
