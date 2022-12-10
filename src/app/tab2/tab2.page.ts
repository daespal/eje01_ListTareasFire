import { Component } from '@angular/core';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public task: Task[];
  constructor(private taskSer:TasksService) {
    this.taskSer.getTask().subscribe(resp=>{
      this.task = resp
    });
  }

}
