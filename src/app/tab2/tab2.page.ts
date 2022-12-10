import { AlertController } from '@ionic/angular';
import { Task } from './../models/task';
import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public task: Task[];
  public tasks: Task;
  constructor(private taskSer:TasksService, private alertController:AlertController) {
    this.taskSer.getTaskComplete().subscribe(resp=>{
      this.task = resp
    });
  }

  public async saveComplete(id:string,titulo:string, fechaIni:string,fechaFin:string,tarea:string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas regresar la tarea seleccionada a la lista normal?',
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
            this.tasks = {
              titulo:titulo,
              fechaIni:fechaIni,
              fechaFin:fechaFin,
              tarea:tarea
            }
            this.taskSer.newTask(this.tasks);
            this.taskSer.removeTaskComplete(id);
          }
        }
      ]
    });
   
    await alert.present();
  }

  public async removeTask(id:string) {
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
            this.taskSer.removeTaskComplete(id);
          }
        }
      ]
    });

    await alert.present();



  }

}
