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
      console.log(this.listaMediciones)
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

  verMediciones() {
    console.log("ver mediciones");
  }

  verLogs() {
    console.log("ver logs");
  }

}
