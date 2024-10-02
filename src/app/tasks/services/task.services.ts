import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskAddedSubject = new Subject<Task>();
  taskAdded$ = this.taskAddedSubject.asObservable();


  addTask(task: Task) {
    this.taskAddedSubject.next(task);
  }

}
