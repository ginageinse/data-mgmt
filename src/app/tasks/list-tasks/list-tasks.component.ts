import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllTasks } from '../task.selectors';
import { Task, Person } from '../task.model';
import { TaskService } from '../task.services';
import { updateTask } from '../task.actions';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  existTask: boolean = false;
  filteredTasks: Task[] = [];
  currentFilter: string = 'all';
  emptyTask: boolean = false;

  constructor(
    private store: Store,
    private taskService: TaskService
  ) {};

  ngOnInit() {
    this.tasks$ = this.store.select(selectAllTasks);
    this.tasks$.subscribe(tasks => {
      this.existTask = tasks.length > 0;
      this.setFilter('all');
    });
  }

  getSkills(person: Person): string {
    return person.skills.join(', ');
  }

  toggleCompletion(task: Task) {
    const updatedTask = {
      ...task,
      isCompleted: !task.isCompleted
    };
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  setFilter(filter: string) {
    this.currentFilter = filter;
    this.tasks$.subscribe(tasks => {
      this.applyFilter(tasks);
    });
  }

  applyFilter(tasks: Task[]) {

    if (this.currentFilter === 'completed') {
      this.filteredTasks = tasks.filter(task => task.isCompleted);
    } else if (this.currentFilter === 'notCompleted') {
      this.filteredTasks = tasks.filter(task => !task.isCompleted);
    } else {
      this.filteredTasks = tasks;
    }
    this.emptyFilterTask(this.filteredTasks)
  }

  emptyFilterTask( task: Task[]) {
    if (task.length === 0) {
      this.emptyTask = false;
    } else {
      this.emptyTask = true;
    }
  }
}
