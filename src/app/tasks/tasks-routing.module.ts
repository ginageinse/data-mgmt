import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';

const routes: Routes = [
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'list-tasks', component: ListTasksComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
