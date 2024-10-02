import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksModule } from './tasks/tasks.module';
import { CreateTaskComponent } from './tasks/create-task/create-task.component';
import { StoreModule } from '@ngrx/store';
import { taskReducer } from './tasks/task.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ReactiveFormsModule } from '@angular/forms';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTaskComponent,
    ListTasksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TasksModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ task: taskReducer }),
    StoreDevtoolsModule.instrument({}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
