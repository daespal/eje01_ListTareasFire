import { Task } from './../models/task';
import { Router } from '@angular/router';
import { TasksService } from './../services/tasks.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public tasks: Task;
  public myForm: FormGroup;
  public validationMessages: object;

  constructor(private taskService:TasksService, private fb:FormBuilder, private navCtrol:NavController,
    private alertController:AlertController, private router:Router) {
      this.tasks ={
        titulo:"",
        fechaIni:"",
        fechaFin:"",
        tarea:""

      }

    this.myForm = this.fb.group({
      titulo:["",Validators.required],
      fechaIni:["",Validators.required],
      fechaFin:["",Validators.required],
      tarea:["",Validators.required]
    });

    this.validationMessages = {
      'titulo': [
        { type: 'required', message: "Debe capturar el titulo"}
      ],
      'fechaIni': [
        { type: 'required', message: "Debe capturar la fecha de inicio"}
      ],
      'fechaFin': [
        { type: 'required', message: "Debe capturar la fecha de finalizacion"}
      ],
      'tarea': [
        { type: 'required', message: "Debe capturar la descripcion de la tarea"}
      ]
    }
  }

  public newTask() {
    this.tasks = {
      titulo: this.myForm.controls.titulo.value,
      fechaIni: this.myForm.controls.fechaIni.value,
      fechaFin: this.myForm.controls.fechaFin.value,
      tarea: this.myForm.controls.tarea.value
    }
    this.taskService.newTask(this.tasks);

  }

  public async saveProduct() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas guardar la nueva tarea?',
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
          this.newTask();
          
          }
         
        }
      ]
    });
    
    await alert.present();



  }

}
