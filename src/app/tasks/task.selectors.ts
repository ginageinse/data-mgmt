import { createSelector } from '@ngrx/store';
import { TaskState } from './task.state';

export const selectTaskState = (state: any) => state.task;

export const selectAllTasks = createSelector(
  selectTaskState,
  (state: TaskState) => {
    console.log('Selector llamado:', state.tasks);
    return state.tasks;
  }
);
