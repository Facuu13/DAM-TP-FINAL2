import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService {

  constructor(private _http: HttpClient) { }

  getDispositivos () {
    return this._http.get('http://localhost:8000/dispositivos').pipe(map((data : any)=> {
        return data;
    }))
  }

  getMediciones (): Observable<any>  {
    return this._http.get('http://localhost:8000/mediciones').pipe(map((data : any)=> {
        return data;
    }))
  }

  getElectrovalvulas (): Observable<any>  {
    return this._http.get('http://localhost:8000/electrovalvulas').pipe(map((data : any)=> {
        return data;
    }))
  }

  getLogs (): Observable<any>  {
    return this._http.get('http://localhost:8000/logriegos').pipe(map((data : any)=> {
        return data;
    }))
  }
}
