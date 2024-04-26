import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {

  listaDispositivos: any[] = [];
  listaMediciones: any[] = [];
  isLoading: boolean = false;
  mostrarGrafico: boolean = false;
  dispositvoSeleccionado!: number;

  mostrarTablaMediciones = false;
  
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

  switchElectrovalvula() {
    console.log("abrir o cerrar electrovalvula");
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
mostrarTabla() {
  this.mostrarTablaMediciones = true;
}

  verLogs() {
    console.log("ver logs");
  }

}
