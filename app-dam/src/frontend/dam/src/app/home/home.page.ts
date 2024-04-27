import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//
class LogRiego {
  apertura!: number;
  fecha!: string;
  electrovalvulaId!: number;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {

  listaDispositivos: any[] = [];
  listaMediciones: any[] = [];
  listaLogs : any[] = [];
    isLoading: boolean = false;
  mostrarGrafico: boolean = false;
  dispositvoSeleccionado!: number;
  abiertoElectrovalvula: boolean = false;
  logRiego!: LogRiego;
  mostrarTablaMediciones = false;
  mostrarTablaLog = false;
  
  constructor(private servicio: DispositivoService, private http: HttpClient) {}

  ngOnInit(){
    this.listarDispositivos();
  }

  listarDispositivos(){
    this.isLoading = true;
    this.servicio.getDispositivos().subscribe((data: any) => {
      this.listaDispositivos = data;
      this.isLoading = false;
    });
  }

  mostrarSensor(idDispositivo: number){
    this.abiertoElectrovalvula = false;
    this.mostrarTablaLog = false;
    this.mostrarTablaMediciones = false; 
    this.dispositvoSeleccionado = idDispositivo;
    this.servicio.getMediciones().subscribe((data: any) => {
      this.listaMediciones = data;
      this.listaMediciones = this.listaMediciones.filter(m => m.dispositivoId === idDispositivo);
      const ultimoElemento = this.listaMediciones[this.listaMediciones.length - 1];
      console.log("el ultimo valor medido es: ",ultimoElemento.valor)
      this.generarGrafico();
      this.mostrarGrafico = true;
    });
  }
  generarGrafico() {
    console.log("mostrar grafico");
  }

  switchElectrovalvula(idDispositivo: number) {
   // `apertura` tinyint(4) DEFAULT NULL,
  //`fecha` datetime DEFAULT NULL,
  //`electrovalvulaId` int(11) NOT NULL
  
    this.abiertoElectrovalvula = !this.abiertoElectrovalvula; // Cambiar el estado de la electrovalvula
    const estado = this.abiertoElectrovalvula ? 'abierto' : 'cerrado';
    console.log(this.abiertoElectrovalvula);
    let dispositivo = this.listaDispositivos.find(m => m.dispositivoId === idDispositivo);
    let newFecha = new Date();
    const fechaFormateada = this.formatDate(newFecha);
    this.logRiego = {
      apertura: this.abiertoElectrovalvula ? 1 : 0,
      electrovalvulaId: dispositivo.electrovalvulaId,
      fecha: fechaFormateada
    }
    this.servicio.agregarRegistroLogRiegos(this.logRiego.apertura, this.logRiego.fecha, this.logRiego.electrovalvulaId).subscribe({
      next: () => {
        console.log("Se guardo correctamente")
        console.log(`Electrovalvula ${estado}`);
      },
      error: (error) => {
        console.log("Error", error)
      }
    })
  }

  formatDate(date: Date): string {
    const day: string = String(date.getDate()).padStart(2, '0');
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const year: string = String(date.getFullYear());
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');
    const seconds: string = String(date.getSeconds()).padStart(2, '0');
    //'2020-11-26 21:19:41'
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


  verMediciones(idDispositivo: number) {
    this.dispositvoSeleccionado = idDispositivo;
    this.servicio.getMediciones().subscribe((data: any) => {
      this.listaMediciones = data;
      this.listaMediciones = this.listaMediciones.filter(m => m.dispositivoId === idDispositivo);
      console.log(this.listaMediciones)
    });
    console.log("ver mediciones");
  }

  // Función para mostrar las mediciones en una tabla
mostrarTablaM() {
  this.mostrarTablaMediciones = true;
}

  verLogs(idDispositivo: number) {
    let dispositivo = this.listaDispositivos.find(m => m.dispositivoId === idDispositivo);
    this.servicio.getLogs().subscribe((data: any) => {
      this.listaLogs = data;
      this.listaLogs = this.listaLogs.filter(l => l.electrovalvulaId === dispositivo.electrovalvulaId);
      console.log(this.listaLogs)
    });
  }

  mostrarTablaLogRiegos() {
    this.mostrarTablaLog = true;
  }
  

}
