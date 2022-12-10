import { TasksService } from './../services/tasks.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public task: Task[];
  completo:number;

  constructor(private taskSer:TasksService, private alertCon:AlertController, private router: Router, private alertController:AlertController ) {
    this.taskSer.getTask().subscribe(resp=>{
      this.task = resp
    });

     
  }

  public async removeStudent(id:string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.taskSer.removeTask(id);
          }
        }
      ]
    });

    await alert.present();



  }

}
