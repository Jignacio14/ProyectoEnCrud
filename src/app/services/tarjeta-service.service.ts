import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TarjetaServiceService {

  private myAppUrl: string = '';
  private myApiUrl: string = 'api/tarjeta/';

  constructor(private http: HttpClient) {
  }

  getListaTarjeta(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl); 
  }

  deleteTarjeta(id: number){
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveTarjeat(tarjeta: any) {
    return this.http.post(this.myAppUrl + this.myApiUrl, tarjeta)
  }

  updateTarjeta(id: number, tarjeta: any){
    return this.http.put(this.myAppUrl + this.myApiUrl + id, tarjeta);
  }

}
