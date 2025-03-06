import { Injectable } from '@angular/core';
import {globalBackendUrl} from "../utils/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificaResponse} from "../dtos/response/NotificaResponse";

@Injectable({
  providedIn: 'root'
})
export class NotificaService {

  private backendUrl: string = globalBackendUrl + 'notifica/';

  constructor(private http: HttpClient) {
  }

  getByUtente(): Observable<NotificaResponse[]> {
    return this.http.get<NotificaResponse[]>
    (this.backendUrl + 'getAllByUtente/' + localStorage.getItem('userId') || '0', {headers: this.getHeader()});
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': localStorage.getItem('jwt') ? `${localStorage.getItem('jwt')}` : '',
      id: localStorage.getItem('userId') ? `${localStorage.getItem('userId')}` : '',
      ruolo: localStorage.getItem('ruolo') ? `${localStorage.getItem('ruolo')}` : ''
    });
  }
}
