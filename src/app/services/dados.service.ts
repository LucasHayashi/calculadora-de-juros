import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DadosService {
  private readonly API_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.1178/dados/ultimos/1?formato=json';

  constructor(private http: HttpClient) { }

  getTaxaSelicAnualizada(): Observable<{ data: string; valor: string }> {
    return this.http.get<{ data: string; valor: string }[]>(this.API_URL).pipe(
      map((response) => response[0])
    );
  }
}