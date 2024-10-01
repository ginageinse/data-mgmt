import { createAction, props } from '@ngrx/store';
import { Task } from './task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);
