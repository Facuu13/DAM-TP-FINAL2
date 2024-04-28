import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import * as Highcharts from 'highcharts';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

//
class LogRiego {
  apertura!: number;
  fecha!: string;
  electrovalvulaId!: number;
}

class Medicion {
  fecha!: string;
  valor!: string;
  dispositivoId!: number;

}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {
  private valorObtenido:number=0;
  public myChart: any;
  // private chartOptions: any;

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
  medicion!: Medicion;

  chartOptions: any ={
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      ,title: {
        text: ''
      }

      ,credits:{enabled:false}
      
         
      ,pane: {
          startAngle: -150,
          endAngle: 150
      } 
      // the value axis
    ,yAxis: {
      min: 0,
      max: 100,

      minorTickInterval: 'auto',
      minorTickWidth: 1,
      minorTickLength: 10,
      minorTickPosition: 'inside',
      minorTickColor: '#666',

      tickPixelInterval: 30,
      tickWidth: 2,
      tickPosition: 'inside',
      tickLength: 10,
      tickColor: '#666',
      labels: {
          step: 2,
          rotation: 'auto'
      },
      title: {
          text: 'kPA'
      },
      plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
      }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
      }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
      }]
  }
  ,
  series: [{
      name: 'kPA',
      data: [0],
      tooltip: {
          valueSuffix: ' kPA'
      }
  }]
  };
  
  constructor(private servicio: DispositivoService, private http: HttpClient) {
  }

  ngOnInit(){
    this.listarDispositivos();
    
  }

  ionViewDidEnter() {
    this.generarChart();
  }

  updateChart(valorMedicion: number, nombreDispositivo: string){
    console.log(valorMedicion)
    // this.myChart.series[0].setData([valorMedicion]); //este data no le hace el update
    this.myChart.update({
      title:{
              text: nombreDispositivo
            },
            series: [{
              name: valorMedicion + ' kPA',
        data: [valorMedicion], //este data no le hace el update
        tooltip: {
            valueSuffix: valorMedicion +' kPA'
        },
            }]
    });
  }

  generarChart() {
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }

  listarDispositivos(){
    this.isLoading = true;
    this.servicio.getDispositivos().subscribe((data: any) => {
      this.listaDispositivos = data;
      this.isLoading = false;
    });
  }

  mostrarSensor(idDispositivo: number){
    this.mostrarGrafico = false;
    this.abiertoElectrovalvula = false;
    this.mostrarTablaLog = false;
    this.mostrarTablaMediciones = false; 
    this.dispositvoSeleccionado = idDispositivo;
    let dispositivo = this.listaDispositivos.find(m => m.dispositivoId === idDispositivo);
    this.servicio.getMediciones().subscribe((data: any) => {
      this.listaMediciones = data;
      this.listaMediciones = this.listaMediciones.filter(m => m.dispositivoId === idDispositivo);
      const ultimoElemento = this.listaMediciones[this.listaMediciones.length - 1];
      this.mostrarGrafico = true;
      this.updateChart(ultimoElemento.valor, dispositivo.nombre);
    });
  }

  switchElectrovalvula(idDispositivo: number) {
    this.mostrarTablaLog = false;
    this.mostrarTablaMediciones = false; 
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

    if (!this.abiertoElectrovalvula){
      const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
      this.medicion = {
        fecha: fechaFormateada,
        valor: numeroAleatorio.toString(),
        dispositivoId: idDispositivo
      }
      this.servicio.agregarValorMedicion(this.medicion.fecha,this.medicion.valor,this.medicion.dispositivoId).subscribe({
        next: () => {
          console.log("Se guardo correctamente")
        },
        error: (error) => {
          console.log("Error", error)
        }
      })
    }
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
    this.mostrarTablaLog = false;
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
  if(this.mostrarTablaMediciones){
    this.mostrarTablaMediciones = false;
  }
  else{
    this.mostrarTablaMediciones = true;
  }
  
}

  verLogs(idDispositivo: number) {
    this.mostrarTablaMediciones = false; 
    let dispositivo = this.listaDispositivos.find(m => m.dispositivoId === idDispositivo);
    this.servicio.getLogs().subscribe((data: any) => {
      this.listaLogs = data;
      this.listaLogs = this.listaLogs.filter(l => l.electrovalvulaId === dispositivo.electrovalvulaId);
      console.log(this.listaLogs)
    });
  }

  mostrarTablaLogRiegos() {
    if (this.mostrarTablaLog){
      this.mostrarTablaLog = false
    }
    else{
      this.mostrarTablaLog = true;
    }
    
  }
  

}
