import { createAction, props } from '@ngrx/store';
import { Task } from '../models/task.model';

export const addTask = createAction(
  '[Task] Add Task',
  props<{ task: Task }>()
);

export const removeTask = createAction(
  '[Task] Remove Task',
  props<{ id: number }>()
);

export const updateTask = createAction(
  '[Task] Update Task',
  props<{ task: Task }>()
);
