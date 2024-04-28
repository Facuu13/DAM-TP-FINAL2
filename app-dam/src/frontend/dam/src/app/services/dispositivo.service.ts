import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map } from 'rxjs';

class LogRiego {
  apertura!: number;
  fecha!: Date;
  electrovalvulaId!: number;
}
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

  // Método para enviar una solicitud POST para agregar un registro en Log_Riegos
  agregarRegistroLogRiegos(apertura: number, fecha: string, electrovalvulaId: number): Observable<any> {
    const body = { apertura, fecha, electrovalvulaId };
    return this._http.post('http://localhost:8000/logriegos', body);
  }

  // Método para enviar una solicitud POST para agregar un valor en mediciones
  agregarValorMedicion(fecha: string, valor: string, dispositivoId: number): Observable<any> {
    const body = { fecha, valor, dispositivoId };
    return this._http.post('http://localhost:8000/mediciones', body);
  }
}
