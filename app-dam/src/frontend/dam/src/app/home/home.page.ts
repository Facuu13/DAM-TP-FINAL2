import { Component, OnInit } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],

})
export class HomePage implements OnInit {
 
  listaDispositivos: any[] = [];
    isLoading: boolean = false;

  constructor(private servicio: DispositivoService, private http: HttpClient,private navCtrl: NavController) {
  }

  ngOnInit(){
    this.listarDispositivos();
    
  }

  goToDetail(idDispositivo: number){
    this.navCtrl.navigateForward(`detalle-dispositivo/${idDispositivo}`);
  }

  listarDispositivos(){
    this.isLoading = true;
    this.servicio.getDispositivos().subscribe((data: any) => {
      this.listaDispositivos = data;
      this.isLoading = false;
    });
  }

}
