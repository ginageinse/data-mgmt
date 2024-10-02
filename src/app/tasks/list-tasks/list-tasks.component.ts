import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks } from '../task.selectors';
import { Task, Person } from '../task.model';
import { TaskService } from '../task.services';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  existTask: boolean = false;

  constructor(
    private store: Store,
    private taskService: TaskService
  ) {};

  ngOnInit() {
    this.tasks$ = this.store.select(selectAllTasks);
    this.tasks$.subscribe(tasks => {
      this.existTask = tasks.length > 0;
    });
  }

  getSkills(person: Person): string {
    return person.skills.join(', ');
  }


}
