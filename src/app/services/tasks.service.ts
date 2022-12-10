import { Task } from './../models/task';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private firestore:AngularFirestore) { }

  public getTask(): Observable<Task[]>{
    return this.firestore.collection('tasks').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      }));
  }

  public getTaskComplete(): Observable<Task[]>{
    return this.firestore.collection('taskComp').snapshotChanges().pipe(
      map(actions=>{
        return actions.map(a=>{
          const data = a.payload.doc.data() as Task;
          const id = a.payload.doc.id;
          return {id, ...data}
        });
      }));
  }

  
  public getTaskByComplete(complete:string){
    let result = this.firestore.collection('tasks').doc(complete).valueChanges();
    return result;
  }

  public removeTask(id:string){
    this.firestore.collection('tasks').doc(id).delete();
  }

  
  public removeTaskComplete(id:string){
    this.firestore.collection('taskComp').doc(id).delete();
  }

  public newTask(task: Task){
    this.firestore.collection('tasks').add(task);
  }

  public newTaskCompl(task: Task){
    this.firestore.collection('taskComp').add(task);
  }

  public getTaskById(id:string){
    let result = this.firestore.collection('tasks').doc(id).valueChanges();
    return result;
  }
}
